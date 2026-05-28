"use client"

import { useState } from "react"
import CompanyLayout from "@/components/company/CompanyLayout"

type ApplicantStatus = "applied" | "screening" | "interview" | "offered" | "hired" | "rejected"

interface Applicant {
  id: string
  name: string
  age: number
  photoUrl: string
  appliedDate: string
  status: ApplicantStatus
  jobTitle: string
  score: number
  lastContact: string
}

const statusLabels: Record<ApplicantStatus, string> = {
  applied: "応募受付",
  screening: "書類選考中",
  interview: "面接調整中",
  offered: "内定通知済み",
  hired: "採用",
  rejected: "不採用",
}

const statusColors: Record<ApplicantStatus, string> = {
  applied: "bg-blue-100 text-blue-800",
  screening: "bg-yellow-100 text-yellow-800",
  interview: "bg-purple-100 text-purple-800",
  offered: "bg-green-100 text-green-800",
  hired: "bg-green-600 text-white",
  rejected: "bg-gray-100 text-gray-600",
}

const sampleApplicants: Applicant[] = [
  {
    id: "1",
    name: "佐藤 太郎",
    age: 28,
    photoUrl: "https://ui-avatars.com/api/?name=A+Sample&background=4F46E5&color=fff",
    appliedDate: "2026-05-20",
    status: "interview",
    jobTitle: "建築現場監督",
    score: 88,
    lastContact: "2026-05-23",
  },
  {
    id: "2",
    name: "田中 花子",
    age: 25,
    photoUrl: "https://ui-avatars.com/api/?name=B+User&background=10B981&color=fff",
    appliedDate: "2026-05-18",
    status: "screening",
    jobTitle: "建築現場監督",
    score: 82,
    lastContact: "2026-05-19",
  },
  {
    id: "3",
    name: "鈴木 一郎",
    age: 32,
    photoUrl: "https://ui-avatars.com/api/?name=C+Demo&background=F59E0B&color=fff",
    appliedDate: "2026-05-15",
    status: "offered",
    jobTitle: "建築現場監督",
    score: 92,
    lastContact: "2026-05-24",
  },
  {
    id: "4",
    name: "鈴木 花子",
    age: 27,
    photoUrl: "https://ui-avatars.com/api/?name=D+Test&background=EC4899&color=fff",
    appliedDate: "2026-05-22",
    status: "applied",
    jobTitle: "建築施工管理",
    score: 76,
    lastContact: "2026-05-22",
  },
]

export default function ApplicantsPage() {
  const [filterStatus, setFilterStatus] = useState<ApplicantStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredApplicants = sampleApplicants.filter((applicant) => {
    const matchesStatus = filterStatus === "all" || applicant.status === filterStatus
    const matchesSearch =
      searchQuery === "" ||
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusCounts = sampleApplicants.reduce(
    (acc, applicant) => {
      acc[applicant.status] = (acc[applicant.status] || 0) + 1
      return acc
    },
    {} as Record<ApplicantStatus, number>
  )

  const handleStatusChange = (applicantId: string, newStatus: ApplicantStatus) => {
    // TODO: API連携
    console.log(`Applicant ${applicantId} status changed to ${newStatus}`)
    alert("ステータスを更新しました")
  }

  return (
    <CompanyLayout title="応募者管理" subtitle="スカウト・応募者の選考進捗を管理">
      {/* 統計サマリー */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`p-4 rounded-lg border-2 transition-colors ${
            filterStatus === "all"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <p className="text-sm text-gray-600">すべて</p>
          <p className="text-2xl font-bold text-gray-900">{sampleApplicants.length}</p>
        </button>
        {Object.entries(statusLabels).map(([status, label]) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as ApplicantStatus)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              filterStatus === status
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {statusCounts[status as ApplicantStatus] || 0}
            </p>
          </button>
        ))}
      </div>

      {/* 検索バー */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="名前または求人名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 応募者リスト */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                応募者
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                求人
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                スコア
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                応募日
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最終連絡
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={applicant.photoUrl}
                      alt={applicant.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                      <div className="text-sm text-gray-500">{applicant.age}歳</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{applicant.jobTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{applicant.score}点</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {applicant.appliedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={applicant.status}
                    onChange={(e) =>
                      handleStatusChange(applicant.id, e.target.value as ApplicantStatus)
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[applicant.status]
                    } border-0 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {applicant.lastContact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">詳細</button>
                  <button className="text-blue-600 hover:text-blue-900">メッセージ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApplicants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">該当する応募者が見つかりません</p>
          </div>
        )}
      </div>
    </CompanyLayout>
  )
}
