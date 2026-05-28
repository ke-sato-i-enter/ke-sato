"use client"

import { useState } from "react"
import CompanyLayout from "@/components/company/CompanyLayout"

type JobStatus = "draft" | "active" | "paused" | "closed"

interface Job {
  id: string
  title: string
  employmentType: string
  location: string
  salary: string
  status: JobStatus
  applicants: number
  views: number
  createdAt: string
  updatedAt: string
}

const statusLabels: Record<JobStatus, string> = {
  draft: "下書き",
  active: "募集中",
  paused: "一時停止",
  closed: "募集終了",
}

const statusColors: Record<JobStatus, string> = {
  draft: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  closed: "bg-red-100 text-red-800",
}

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "建築現場監督",
    employmentType: "正社員",
    location: "東京都",
    salary: "月給30万円〜50万円",
    status: "active",
    applicants: 12,
    views: 245,
    createdAt: "2026-04-01",
    updatedAt: "2026-05-20",
  },
  {
    id: "2",
    title: "建築施工管理",
    employmentType: "正社員",
    location: "東京都・神奈川県",
    salary: "月給28万円〜45万円",
    status: "active",
    applicants: 8,
    views: 182,
    createdAt: "2026-04-15",
    updatedAt: "2026-05-18",
  },
  {
    id: "3",
    title: "建築設計アシスタント",
    employmentType: "正社員",
    location: "東京都",
    salary: "月給25万円〜35万円",
    status: "paused",
    applicants: 5,
    views: 128,
    createdAt: "2026-03-10",
    updatedAt: "2026-05-01",
  },
  {
    id: "4",
    title: "建築CADオペレーター",
    employmentType: "契約社員",
    location: "東京都",
    salary: "時給1,800円〜2,200円",
    status: "draft",
    applicants: 0,
    views: 0,
    createdAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState(sampleJobs)
  const [showNewJobModal, setShowNewJobModal] = useState(false)

  const activeJobsCount = jobs.filter((j) => j.status === "active").length
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0)

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus, updatedAt: "2026-05-25" } : job
      )
    )
    alert(`求人のステータスを「${statusLabels[newStatus]}」に変更しました`)
  }

  const handleDeleteJob = (jobId: string) => {
    if (confirm("この求人を削除してもよろしいですか？")) {
      setJobs(jobs.filter((job) => job.id !== jobId))
      alert("求人を削除しました")
    }
  }

  return (
    <CompanyLayout title="求人管理" subtitle="募集中の求人情報を管理">
      {/* サマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-2">募集中の求人</p>
          <p className="text-3xl font-bold text-blue-600">{activeJobsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-2">総応募数</p>
          <p className="text-3xl font-bold text-gray-900">{totalApplicants}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-2">総求人数</p>
          <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="mb-6">
        <button
          onClick={() => setShowNewJobModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          ＋ 新規求人作成
        </button>
      </div>

      {/* 求人リスト */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                求人タイトル
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                雇用形態
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                給与
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                応募数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                閲覧数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.location}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.employmentType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.salary}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-blue-600">{job.applicants}人</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.views}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value as JobStatus)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[job.status]
                    } border-0 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">編集</button>
                  <button className="text-blue-600 hover:text-blue-900 mr-3">複製</button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 新規求人作成モーダル（簡易版） */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">新規求人作成</h3>
            <p className="text-gray-600 mb-6">
              求人作成機能は開発中です。詳細な求人情報の入力フォームを実装予定です。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowNewJobModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                閉じる
              </button>
              <button
                onClick={() => {
                  alert("求人作成機能は開発中です")
                  setShowNewJobModal(false)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                作成
              </button>
            </div>
          </div>
        </div>
      )}
    </CompanyLayout>
  )
}
