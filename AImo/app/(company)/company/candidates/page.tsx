"use client"

import { useState } from "react"
import CompanyLayout from "@/components/company/CompanyLayout"

interface Candidate {
  id: string
  name: string
  age: number
  gender: string
  location: string
  photoUrl: string
  question1: string
  question2: string
  question3: string
  matchScore: number
}

const sampleCandidates: Candidate[] = [
  {
    id: "1",
    name: "鈴木 太郎",
    age: 28,
    gender: "男性",
    location: "東京都",
    photoUrl: "https://ui-avatars.com/api/?name=X+Alpha&background=4F46E5&color=fff",
    question1: "前職では建築現場で3年間働いていました。現場管理と安全管理を担当していました。",
    question2:
      "常に安全第一を心がけ、チームワークを大切にしています。問題が起きたときは冷静に対処できます。",
    question3:
      "もっと大きなプロジェクトに関わりたいです。マンション建設や商業施設の建設に携わってみたいです。",
    matchScore: 88,
  },
  {
    id: "2",
    name: "佐藤 花子",
    age: 25,
    gender: "女性",
    location: "神奈川県",
    photoUrl: "https://ui-avatars.com/api/?name=Y+Beta&background=10B981&color=fff",
    question1: "専門学校で建築を学び、卒業後は設計事務所でCADオペレーターをしていました。",
    question2: "細かい作業が得意で、正確さには自信があります。新しいことを学ぶのが好きです。",
    question3:
      "現場での実務経験を積みたいです。将来的には施工管理技士の資格を取りたいと思っています。",
    matchScore: 82,
  },
  {
    id: "3",
    name: "鈴木 一郎",
    age: 32,
    gender: "男性",
    location: "千葉県",
    photoUrl: "https://ui-avatars.com/api/?name=Z+Gamma&background=F59E0B&color=fff",
    question1: "10年間建設会社で働いています。主に住宅建築の現場監督をしてきました。",
    question2:
      "責任感が強く、最後までやり遂げる性格です。職人さんとのコミュニケーションも得意です。",
    question3: "自分の経験を活かして、もっと若い人材の育成に関わりたいと思っています。",
    matchScore: 92,
  },
]

export default function CandidatesPage() {
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set())
  const [scoutMessages, setScoutMessages] = useState<Record<string, string>>({})
  const [memos, setMemos] = useState<Record<string, string>>({})

  const handleCandidateSelect = (candidateId: string) => {
    const newSelected = new Set(selectedCandidates)
    if (newSelected.has(candidateId)) {
      newSelected.delete(candidateId)
    } else {
      newSelected.add(candidateId)
    }
    setSelectedCandidates(newSelected)
  }

  const generateScoutMessage = (candidate: Candidate) => {
    const message = `${candidate.name}様

株式会社サンプル建設の採用担当です。

あなたのプロフィールを拝見し、ぜひ当社でご活躍いただきたいと思いご連絡しました。

【ポイント】
${candidate.question1.substring(0, 50)}...という経験は、当社のプロジェクトで大いに活かせると考えています。

${candidate.question3.substring(0, 50)}...という目標も、当社で実現できる環境があります。

ぜひ一度、カジュアルにお話しさせていただけませんか？

ご返信お待ちしております。`

    setScoutMessages({ ...scoutMessages, [candidate.id]: message })
  }

  const handleScoutSend = (candidateId: string) => {
    // TODO: API連携
    console.log(`Sending scout to ${candidateId}`)
    alert("スカウトを送信しました")
  }

  const handleSkip = (candidateId: string) => {
    // TODO: API連携
    console.log(`Skipping ${candidateId}`)
  }

  return (
    <CompanyLayout title="応募者検索" subtitle="条件に合う候補者にスカウトを送信">
      {/* 選択中の候補者数 */}
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

      {/* 候補者カード */}
      <div className="space-y-6">
        {sampleCandidates.map((candidate) => (
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
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="h-16 w-16 rounded-full border-2 border-white"
                />
                <div>
                  <h3 className="text-xl font-bold">{candidate.name}</h3>
                  <p className="text-blue-100">
                    {candidate.age}歳 / {candidate.gender} / {candidate.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">マッチ度</p>
                <p className="text-3xl font-bold">{candidate.matchScore}%</p>
              </div>
            </div>

            {/* Q&A */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Q1. これまでの経験を教えてください
                </p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {candidate.question1}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Q2. あなたの強みは何ですか？
                </p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {candidate.question2}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Q3. 今後どんな仕事をしたいですか？
                </p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {candidate.question3}
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
                      setScoutMessages({
                        ...scoutMessages,
                        [candidate.id]: e.target.value,
                      })
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
                onClick={() => handleSkip(candidate.id)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
              >
                スキップ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* さらに読み込む */}
      <div className="mt-8 text-center">
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          さらに候補者を表示
        </button>
      </div>
    </CompanyLayout>
  )
}
