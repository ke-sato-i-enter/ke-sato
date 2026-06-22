"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getAuthSession, signOut } from "@/lib/cognito-auth"

interface UserData {
  id: string
  email: string
  name?: string
  birthDate?: string
  gender?: string
  address?: string
  phone?: string
  profile?: {
    question1Answer?: string
    question2Answer?: string
    question3Answer?: string
  } | null
}

const GENDER_LABELS: Record<string, string> = {
  male: "男性",
  female: "女性",
  other: "その他",
}

export default function MyPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      const { tokens } = await getAuthSession()
      const idToken = tokens?.idToken?.toString()

      if (!idToken) {
        router.replace("/login")
        return
      }

      const res = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${idToken}` },
      })

      if (!res.ok) {
        if (res.status === 401) {
          router.replace("/login")
          return
        }
        setError("プロフィールの取得に失敗しました")
        setIsLoading(false)
        return
      }

      const data = await res.json()
      setUserData(data.user)
      setIsLoading(false)
    }

    fetchProfile()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Hoge APP
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">マイページ</h1>

        {/* 基本情報 */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
          <dl className="space-y-3">
            <InfoRow label="氏名" value={userData?.name} />
            <InfoRow label="メールアドレス" value={userData?.email} />
            <InfoRow label="生年月日" value={userData?.birthDate} />
            <InfoRow label="性別" value={userData?.gender ? GENDER_LABELS[userData.gender] : undefined} />
            <InfoRow label="住所" value={userData?.address} />
            <InfoRow label="電話番号" value={userData?.phone} />
          </dl>
        </section>

        {/* Q&A */}
        {userData?.profile && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Q&A</h2>
            <div className="space-y-4">
              <QARow
                question="今までどんな仕事をしてきましたか？"
                answer={userData.profile.question1Answer}
              />
              <QARow
                question="どんな仕事がしたいですか？"
                answer={userData.profile.question2Answer}
              />
              <QARow
                question="あなたの強みは何ですか？"
                answer={userData.profile.question3Answer}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-4">
      <dt className="w-32 text-sm text-gray-500 shrink-0">{label}</dt>
      <dd className="text-sm text-gray-900">{value ?? "未設定"}</dd>
    </div>
  )
}

function QARow({ question, answer }: { question: string; answer?: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-1">{question}</p>
      <p className="text-sm text-gray-900 bg-gray-50 rounded p-3">{answer ?? "未回答"}</p>
    </div>
  )
}
