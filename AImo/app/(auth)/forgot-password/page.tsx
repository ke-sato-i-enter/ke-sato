"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { initiatePasswordReset } from "@/lib/cognito-auth"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("メールアドレスを入力してください")
      return
    }

    setIsLoading(true)
    setError("")

    const { success, error: resetError } = await initiatePasswordReset(email)

    if (!success) {
      setError(resetError ?? "送信に失敗しました。もう一度お試しください。")
      setIsLoading(false)
      return
    }

    router.push(`/forgot-password/confirm?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">Hoge APP</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          パスワードをお忘れの方
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          登録済みのメールアドレスにリセットコードを送信します
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "送信中..." : "リセットコードを送信"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              ログインに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
