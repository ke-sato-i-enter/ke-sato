import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireAuth } from "@/lib/auth-server"
import { updateUser } from "@/lib/dynamodb"
import { getUserProfile } from "@/lib/user-sync"

// バリデーションスキーマ
const profileSchema = z.object({
  name: z.string().min(1, "氏名を入力してください"),
  birthDate: z.string().min(1, "生年月日を入力してください"),
  gender: z.enum(["male", "female", "other"], {
    message: "性別を選択してください",
  }),
  address: z.string().min(1, "住所を入力してください"),
  phone: z.string().min(1, "電話番号を入力してください"),
})

// プロフィール取得
export async function GET(req: NextRequest) {
  try {
    const { user, error } = await requireAuth(req)
    if (error) return error

    // CognitoユーザーをDBと同期（存在しない場合は自動作成）
    const dbUser = await getUserProfile(user)

    if (!dbUser) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 })
    }

    return NextResponse.json({ user: dbUser })
  } catch (error) {
    console.error("プロフィール取得エラー:", error)
    return NextResponse.json({ error: "プロフィール取得に失敗しました" }, { status: 500 })
  }
}

// プロフィール更新
export async function PUT(req: NextRequest) {
  try {
    const { user, error } = await requireAuth(req)
    if (error) return error

    const body = await req.json()

    // バリデーション
    const { name, birthDate, gender, address, phone } = profileSchema.parse(body)

    // CognitoユーザーをDBと同期（存在しない場合は自動作成）
    const dbUser = await getUserProfile(user)

    if (!dbUser) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 })
    }

    // ユーザー情報更新
    const updatedUser = await updateUser(user.sub, {
      name,
      birthDate,
      gender,
      address,
      phone,
    })

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "プロフィールを更新しました",
    })
  } catch (error) {
    console.error("プロフィール更新エラー:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "プロフィール更新に失敗しました" }, { status: 500 })
  }
}
