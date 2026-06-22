"use client"

import { useEffect, useState } from "react"
import CompanyLayout from "@/components/company/CompanyLayout"

const GENDER_LABELS: Record<string, string> = {
  male: "男性",
  female: "女性",
  other: "その他",
}

interface Candidate {
  id: string
  name: string
  email: string
  age: number | null
  gender: string | null
  address: string | null
  question1Answer: string | null
  question2Answer: string | null
  question3Answer: string | null
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set())
  const [scoutMessages, setScoutMessages] = useState<Record<string, string>>({})
  const [memos, setMemos] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch("/api/admin/applicants")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setCandidates(data.applicants)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  const handleCandidateSelect = (id: string) => {
    const next = new Set(selectedCandidates)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelectedCandidates(next)
  }

  const generateScoutMessage = (candidate: Candidate) => {
    const q1 = candidate.question1Answer ?? ""
    const q3 = candidate.question3Answer ?? ""
    const message = `${candidate.name}様

株式会社サンプル建設の採用担当です。

あなたのプロフィールを拝見し、ぜひ当社でご活躍いただきたいと思いご連絡しました。

【ポイント】
${q1.substring(0, 50)}...という経験は、当社のプロジェクトで大いに活かせると考えています。

${q3.substring(0, 50)}...という目標も、当社で実現できる環境があります。

ぜひ一度、カジュアルにお話しさせていただけませんか？

ご返信お待ちしております。`

    setScoutMessages({ ...scoutMessages, [candidate.id]: message })
  }

  const handleScoutSend = (candidateId: string) => {
    console.log(`Sending scout to ${candidateId}`)
    alert("スカウトを送信しました")
  }

  return (
    <CompanyLayout title="応募者検索" subtitle="条件に合う候補者にスカウトを送信">
      {isLoading && (
        <div className="flex justify-center py-20">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">エラー: {error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {/* 選択中バナー */}
          {selectedCandidates.size > 0 && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
              <p className="text-sm text-blue-800">{selectedCandidates.size}名を選択中</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    selectedCandidates.forEach((id) => handleScoutSend(id))
                    setSelectedCandidates(new Set())
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  まとめてスカウト送信
                </button>
                <button
                  onClick={() => setSelectedCandidates(new Set())}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                >
                  選択解除
                </button>
              </div>
            </div>
          )}

          {candidates.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500">候補者が見つかりません</p>
            </div>
          )}

          {/* 候補者カード */}
          <div className="space-y-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* ヘッダー */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.has(candidate.id)}
                      onChange={() => handleCandidateSelect(candidate.id)}
                      className="h-5 w-5"
                    />
                    <div className="h-16 w-16 rounded-full border-2 border-white bg-blue-300 flex items-center justify-center text-2xl font-bold text-white">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{candidate.name}</h3>
                      <p className="text-blue-100">
                        {candidate.age != null ? `${candidate.age}歳` : "年齢未設定"}
                        {candidate.gender ? ` / ${GENDER_LABELS[candidate.gender] ?? candidate.gender}` : ""}
                        {candidate.address ? ` / ${candidate.address.slice(0, 5)}...` : ""}
                      </p>
                      <p className="text-blue-200 text-sm">{candidate.email}</p>
                    </div>
                  </div>
                </div>

                {/* Q&A */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Q1. 今までどんな仕事をしてきましたか？
                    </p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                      {candidate.question1Answer ?? "未回答"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Q2. どんな仕事がしたいですか？
                    </p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                      {candidate.question2Answer ?? "未回答"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Q3. あなたの強みは何ですか？
                    </p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                      {candidate.question3Answer ?? "未回答"}
                    </p>
                  </div>

                  {/* AIスカウト文案 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">🤖 AIスカウト文案</p>
                      {!scoutMessages[candidate.id] && (
                        <button
                          onClick={() => generateScoutMessage(candidate)}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          生成する
                        </button>
                      )}
                    </div>
                    {scoutMessages[candidate.id] ? (
                      <textarea
                        value={scoutMessages[candidate.id]}
                        onChange={(e) =>
                          setScoutMessages({ ...scoutMessages, [candidate.id]: e.target.value })
                        }
                        rows={8}
                        className="w-full text-sm text-gray-900 bg-amber-50 border border-amber-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="bg-gray-50 p-4 rounded border border-dashed border-gray-300 text-center">
                        <p className="text-sm text-gray-500">
                          「生成する」ボタンでAIがスカウト文を作成します
                        </p>
                      </div>
                    )}
                  </div>

                  {/* メモ */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">📝 メモ</p>
                    <textarea
                      value={memos[candidate.id] || ""}
                      onChange={(e) => setMemos({ ...memos, [candidate.id]: e.target.value })}
                      placeholder="候補者についてのメモを入力..."
                      rows={2}
                      className="w-full text-sm text-gray-900 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
                  <button
                    onClick={() => handleScoutSend(candidate.id)}
                    disabled={!scoutMessages[candidate.id]}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    スカウトを送る
                  </button>
                  <button
                    onClick={() => handleCandidateSelect(candidate.id)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                  >
                    {selectedCandidates.has(candidate.id) ? "選択解除" : "選択する"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </CompanyLayout>
  )
}
