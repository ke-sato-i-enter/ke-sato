"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getAuthSession } from "@/lib/cognito-auth"

const QUESTIONS = [
  {
    id: 1,
    question: "今までどんな仕事をしてきましたか？（ため口でOK）",
    placeholder: "例: コンビニで3年くらいバイトしてました。レジとか品出しとか...",
  },
  {
    id: 2,
    question: "どんな仕事がしたいですか？（ため口でOK）",
    placeholder: "例: 人と話すのが好きだから接客とかやりたい。土日休みだと嬉しい...",
  },
  {
    id: 3,
    question: "あなたの強みは何ですか？（ため口でOK）",
    placeholder: "例: 真面目でコツコツやるのは得意。遅刻とかはしない...",
  },
]

export default function SignupStep3() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    QUESTIONS.forEach((q) => {
      if (!answers[q.id] || answers[q.id].trim() === "") {
        newErrors[`q${q.id}`] = "回答を入力してください"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const { tokens } = await getAuthSession()
      const idToken = tokens?.idToken?.toString()

      const res = await fetch("/api/profile/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          question1Answer: answers[1],
          question2Answer: answers[2],
          question3Answer: answers[3],
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ submit: data.error || "保存に失敗しました" })
        setIsLoading(false)
        return
      }

      // STEP4（登録完了）へ遷移
      router.push("/signup/complete")
    } catch (error) {
      console.error("質問回答保存エラー:", error)
      setErrors({ submit: "保存に失敗しました。もう一度お試しください。" })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <Link href="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">Hoge APP</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">3つの質問に答えよう</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          STEP 3 / 4: 自己PRの質問（ため口OK、AIが自動で敬語に変換）
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {QUESTIONS.map((q) => (
              <div key={q.id}>
                <label
                  htmlFor={`question${q.id}`}
                  className="block text-base font-medium text-gray-900 mb-2"
                >
                  Q{q.id}. {q.question}
                </label>
                <textarea
                  id={`question${q.id}`}
                  name={`question${q.id}`}
                  rows={4}
                  value={answers[q.id]}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  placeholder={q.placeholder}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors[`q${q.id}`] && (
                  <p className="mt-2 text-sm text-red-600">{errors[`q${q.id}`]}</p>
                )}
              </div>
            ))}

            {/* ヒント */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-blue-600 text-lg">💡</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">ため口でOK！</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      難しく考えず、普段話す言葉で書いてください。
                      <br />
                      AIが自動で敬語に変換するので、企業にはちゃんとした文章で届きます。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* エラーメッセージ */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            )}

            {/* ボタン */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                戻る
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isLoading ? "保存中..." : "登録完了"}
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
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
