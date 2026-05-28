/**
 * NextAuth.js v5 設定
 *
 * 求職者会員登録システムの認証設定
 * - Credentials Provider（メール+パスワード認証）
 * - JWT セッション
 * - Prisma によるユーザー検証
 */

import { compare } from "bcryptjs"
import NextAuth, { type DefaultSession, type User as NextAuthUser } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "./db"

// NextAuth の User 型を拡張
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string | null
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name: string | null
  }
}

// ログイン入力バリデーションスキーマ
const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります"),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // 入力バリデーション
          const { email, password } = loginSchema.parse(credentials)

          // データベースからユーザーを検索
          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              name: true,
              passwordHash: true,
            },
          })

          // ユーザーが存在しない
          if (!user) {
            console.log("ログイン失敗: ユーザーが見つかりません", email)
            return null
          }

          // パスワード検証
          const isPasswordValid = await compare(password, user.passwordHash)

          if (!isPasswordValid) {
            console.log("ログイン失敗: パスワードが一致しません", email)
            return null
          }

          // 認証成功
          console.log("ログイン成功:", email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error("バリデーションエラー:", error.issues)
          } else {
            console.error("認証エラー:", error)
          }
          return null
        }
      },
    }),
  ],

  // JWT セッション設定
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30日
  },

  // JWT 設定
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30日
  },

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      // 初回ログイン時にユーザー情報を JWT に追加
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },

    async session({ session, token }) {
      // JWT の情報を session に追加
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string | null
      }
      return session
    },
  },

  // カスタムページ設定
  pages: {
    signIn: "/login", // カスタムログインページ
    // signOut: '/logout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/signup',
  },

  // デバッグモード（開発環境のみ）
  debug: process.env.NODE_ENV === "development",
})

/**
 * サーバーサイドで現在のセッションを取得するヘルパー関数
 *
 * @example
 * import { getCurrentUser } from '@/lib/auth'
 *
 * export default async function Page() {
 *   const user = await getCurrentUser()
 *   if (!user) {
 *     redirect('/login')
 *   }
 *   return <div>Hello {user.name}</div>
 * }
 */
export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

/**
 * 認証が必要なページを保護するヘルパー関数
 *
 * @example
 * import { requireAuth } from '@/lib/auth'
 *
 * export default async function ProtectedPage() {
 *   const user = await requireAuth()
 *   return <div>Hello {user.name}</div>
 * }
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}
