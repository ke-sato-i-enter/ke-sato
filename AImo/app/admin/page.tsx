"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface User {
  pk: string
  email: string
  name?: string
  gender?: string
  birthDate?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

const GENDER_LABELS: Record<string, string> = {
  male: "男性",
  female: "女性",
  other: "その他",
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setUsers(data.users)
          setCount(data.count)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Hoge APP
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-700 font-medium">管理者画面</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 企業管理リンク */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {[
            { href: "/company/dashboard", label: "ダッシュボード" },
            { href: "/company/applicants", label: "応募者管理" },
            { href: "/company/candidates", label: "候補者管理" },
            { href: "/company/jobs", label: "求人管理" },
            { href: "/company/messages", label: "メッセージ" },
            { href: "/company/settings", label: "設定" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-center transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
          {!isLoading && !error && (
            <span className="text-sm text-gray-500">全 {count} 件</span>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">エラー: {error}</p>
          </div>
        )}

        {!isLoading && !error && users.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">登録ユーザーがいません</p>
          </div>
        )}

        {!isLoading && !error && users.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    氏名 / メール
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    性別
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    生年月日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    電話番号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    登録日時
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.pk} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{user.name ?? "未設定"}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.gender ? GENDER_LABELS[user.gender] ?? user.gender : "未設定"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.birthDate ?? "未設定"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.phone ?? "未設定"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
