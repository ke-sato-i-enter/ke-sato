import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireAuth } from "@/lib/auth-server"
import { upsertUserProfile } from "@/lib/dynamodb"
import { getOrCreateUser } from "@/lib/user-sync"

// バリデーションスキーマ
const questionsSchema = z.object({
  question1Answer: z.string().min(1, "質問1の回答を入力してください"),
  question2Answer: z.string().min(1, "質問2の回答を入力してください"),
  question3Answer: z.string().min(1, "質問3の回答を入力してください"),
})

export async function POST(req: NextRequest) {
  try {
    const { user, error } = await requireAuth(req)
    if (error) return error

    const body = await req.json()

    // バリデーション
    const { question1Answer, question2Answer, question3Answer } = questionsSchema.parse(body)

    // CognitoユーザーをDBと同期（存在しない場合は自動作成）
    await getOrCreateUser(user)

    // UserProfileを作成または更新
    const profile = await upsertUserProfile(user.sub, {
      question1Answer,
      question2Answer,
      question3Answer,
    })

    return NextResponse.json({
      success: true,
      profile,
      message: "質問回答を保存しました",
    })
  } catch (error) {
    console.error("質問回答保存エラー:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "質問回答の保存に失敗しました" }, { status: 500 })
  }
}
