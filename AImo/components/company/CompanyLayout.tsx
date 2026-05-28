"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface MenuItem {
  href: string
  icon: string
  label: string
}

const menuItems: MenuItem[] = [
  { href: "/company/dashboard", icon: "📊", label: "ダッシュボード" },
  { href: "/company/candidates", icon: "🔍", label: "応募者検索" },
  { href: "/company/applicants", icon: "📋", label: "応募者管理" },
  { href: "/company/messages", icon: "💬", label: "メッセージ" },
  { href: "/company/jobs", icon: "📝", label: "求人管理" },
  { href: "/company/settings", icon: "⚙️", label: "設定" },
]

interface CompanyLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export default function CompanyLayout({ children, title, subtitle }: CompanyLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* サイドバー */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* ロゴ */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/company/dashboard">
              <h1 className="text-xl font-bold text-blue-600">Hoge APP</h1>
              <p className="text-sm text-gray-600">管理画面</p>
            </Link>
          </div>

          {/* ナビゲーション */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* スカウト残数 */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-md p-3">
              <p className="text-xs text-gray-600 mb-1">スカウト残数</p>
              <p className="text-lg font-bold text-blue-600">
                147 <span className="text-sm font-normal text-gray-600">/ 300通</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="ml-64">
        <div className="p-8">
          {/* ヘッダー */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>

          {/* ページコンテンツ */}
          {children}
        </div>
      </div>
    </div>
  )
}
