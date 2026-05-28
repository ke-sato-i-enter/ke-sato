"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { confirmSignUpCode, resendConfirmationCode, signIn } from "@/lib/cognito-auth"

function ConfirmSignupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const name = searchParams.get("name") || ""

  const [code, setCode] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState("")

  useEffect(() => {
    if (!email) {
      router.push("/signup")
    }
  }, [email, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code) {
      setErrors({ code: "確認コードを入力してください" })
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // 確認コード検証
      const { success, error } = await confirmSignUpCode(email, code)

      if (error) {
        setErrors({ submit: error })
        setIsLoading(false)
        return
      }

      // 確認成功 → Cognitoにログイン状態にするため、一度サインインする
      // （パスワードはわからないので、STEP2へ遷移してユーザーにログインしてもらう）

      // STEP2へ遷移（ログインページへリダイレクト）
      router.push(`/login?email=${encodeURIComponent(email)}&verified=true`)
    } catch (error) {
      console.error("確認エラー:", error)
      setErrors({ submit: "確認に失敗しました。もう一度お試しください。" })
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    setResendMessage("")
    setErrors({})

    try {
      const { success, error } = await resendConfirmationCode(email)

      if (error) {
        setErrors({ submit: error })
      } else {
        setResendMessage("確認コードを再送信しました。メールをご確認ください。")
      }
    } catch (error) {
      setErrors({ submit: "再送信に失敗しました" })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">Hoge APP</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">メール確認</h2>
        <p className="mt-2 text-center text-sm text-gray-600">STEP 1 / 4: 確認コードを入力</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-sm text-blue-800">
              <strong>{email}</strong> 宛に確認コードを送信しました。
              <br />
              メールをご確認ください。
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 確認コード */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                確認コード（6桁）
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-2xl tracking-widest"
                  placeholder="000000"
                />
              </div>
              {errors.code && <p className="mt-2 text-sm text-red-600">{errors.code}</p>}
            </div>

            {/* 再送信メッセージ */}
            {resendMessage && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-800">{resendMessage}</p>
              </div>
            )}

            {/* エラーメッセージ */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            )}

            {/* 送信ボタン */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "確認中..." : "確認して次へ"}
              </button>
            </div>

            {/* 再送信リンク */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400"
              >
                {isResending ? "送信中..." : "コードを再送信"}
              </button>
            </div>
          </form>
        </div>

        {/* プログレスバー */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>STEP 1</span>
            <span>STEP 2</span>
            <span>STEP 3</span>
            <span>STEP 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "25%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmSignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmSignupContent />
    </Suspense>
  )
}
