"use client"

import { useEffect, useState } from "react"
import CompanyLayout from "@/components/company/CompanyLayout"

type ApplicantStatus = "applied" | "screening" | "interview" | "offered" | "hired" | "rejected"

interface Applicant {
  id: string
  name: string
  email: string
  age: number | null
  gender: string | null
  phone: string | null
  address: string | null
  appliedDate: string
  lastContact: string
  status: ApplicantStatus
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

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [filterStatus, setFilterStatus] = useState<ApplicantStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch("/api/admin/applicants")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setApplicants(data.applicants)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  const handleStatusChange = async (applicantId: string, newStatus: ApplicantStatus) => {
    const res = await fetch("/api/admin/applicants", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: applicantId, status: newStatus }),
    })

    if (res.ok) {
      setApplicants((prev) =>
        prev.map((a) => (a.id === applicantId ? { ...a, status: newStatus } : a))
      )
    } else {
      alert("ステータスの更新に失敗しました")
    }
  }

  const filteredApplicants = applicants.filter((a) => {
    const matchesStatus = filterStatus === "all" || a.status === filterStatus
    const matchesSearch =
      searchQuery === "" ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusCounts = applicants.reduce(
    (acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1
      return acc
    },
    {} as Record<ApplicantStatus, number>
  )

  return (
    <CompanyLayout title="応募者管理" subtitle="スカウト・応募者の選考進捗を管理">
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
          {/* 統計サマリー */}
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-6">
            <button
              onClick={() => setFilterStatus("all")}
              className={`p-4 rounded-lg border-2 transition-colors ${
                filterStatus === "all"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <p className="text-sm text-gray-600">すべて</p>
              <p className="text-2xl font-bold text-gray-900">{applicants.length}</p>
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
              placeholder="名前またはメールで検索..."
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
                    氏名 / メール
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    年齢
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    電話番号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    登録日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最終更新
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{applicant.name}</p>
                      <p className="text-sm text-gray-500">{applicant.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {applicant.age != null ? `${applicant.age}歳` : "未設定"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {applicant.phone ?? "未設定"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{applicant.appliedDate}</td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-sm text-gray-500">{applicant.lastContact}</td>
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
        </>
      )}
    </CompanyLayout>
  )
}
