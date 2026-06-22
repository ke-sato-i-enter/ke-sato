"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { completePasswordReset } from "@/lib/cognito-auth"

function ForgotPasswordConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") ?? ""

  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
    newPasswordConfirm: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    if (!formData.code) return "確認コードを入力してください"
    if (!formData.newPassword) return "新しいパスワードを入力してください"
    if (formData.newPassword.length < 8) return "パスワードは8文字以上で入力してください"
    if (!/[A-Z]/.test(formData.newPassword)) return "パスワードに大文字を1文字以上含めてください"
    if (!/[a-z]/.test(formData.newPassword)) return "パスワードに小文字を1文字以上含めてください"
    if (!/[0-9]/.test(formData.newPassword)) return "パスワードに数字を1文字以上含めてください"
    if (formData.newPassword !== formData.newPasswordConfirm) return "パスワードが一致しません"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    const { success, error: resetError } = await completePasswordReset(
      email,
      formData.code,
      formData.newPassword
    )

    if (!success) {
      setError(resetError ?? "リセットに失敗しました。もう一度お試しください。")
      setIsLoading(false)
      return
    }

    router.push(`/login?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">Hoge APP</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          新しいパスワードを設定
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {email} に送信されたコードを入力してください
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                確認コード
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="123456"
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                新しいパスワード
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">8文字以上、大文字・小文字・数字を含めてください</p>
            </div>

            <div>
              <label htmlFor="newPasswordConfirm" className="block text-sm font-medium text-gray-700">
                新しいパスワード（確認）
              </label>
              <div className="mt-1">
                <input
                  id="newPasswordConfirm"
                  name="newPasswordConfirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.newPasswordConfirm}
                  onChange={(e) => setFormData({ ...formData, newPasswordConfirm: e.target.value })}
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
                {isLoading ? "設定中..." : "パスワードを設定する"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              メールアドレスの入力に戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ForgotPasswordConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordConfirmContent />
    </Suspense>
  )
}
