"use client"

import { useState } from "react"
import CompanyLayout from "@/components/company/CompanyLayout"

export default function SettingsPage() {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "株式会社サンプル建設",
    representative: "佐藤 健太",
    postalCode: "100-0001",
    address: "東京都千代田区千代田1-1",
    phone: "03-1234-5678",
    email: "info@example-demo.test",
    website: "https://example-demo.test",
    employees: "50-99名",
    established: "2015年4月",
    capital: "1000万円",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newApplicant: true,
    messageReceived: true,
    interviewReminder: true,
    scoutReply: true,
    emailDigest: false,
  })

  const [planInfo] = useState({
    plan: "スタンダードプラン",
    scoutLimit: 300,
    scoutUsed: 153,
    billingCycle: "月額",
    amount: "¥49,800",
    nextBillingDate: "2026-06-01",
  })

  const handleSaveCompanyInfo = () => {
    // TODO: API連携
    console.log("Saving company info:", companyInfo)
    alert("企業情報を保存しました")
  }

  const handleSaveNotifications = () => {
    // TODO: API連携
    console.log("Saving notification settings:", notificationSettings)
    alert("通知設定を保存しました")
  }

  return (
    <CompanyLayout title="設定" subtitle="企業情報・プラン・通知設定">
      <div className="space-y-6">
        {/* プラン情報 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">現在のプラン</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">プラン</p>
              <p className="text-xl font-bold text-blue-600">{planInfo.plan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">月額料金</p>
              <p className="text-xl font-bold text-gray-900">{planInfo.amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">スカウト利用状況</p>
              <p className="text-sm text-gray-900">
                {planInfo.scoutUsed} / {planInfo.scoutLimit}通
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(planInfo.scoutUsed / planInfo.scoutLimit) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">次回更新日</p>
              <p className="text-sm text-gray-900">{planInfo.nextBillingDate}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              プラン変更
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              請求履歴
            </button>
          </div>
        </div>

        {/* 企業情報 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">企業情報</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  企業名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyInfo.companyName}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  代表者名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyInfo.representative}
                  onChange={(e) =>
                    setCompanyInfo({ ...companyInfo, representative: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">郵便番号</label>
                <input
                  type="text"
                  value={companyInfo.postalCode}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, postalCode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                所在地 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ウェブサイト</label>
                <input
                  type="url"
                  value={companyInfo.website}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">従業員数</label>
                <select
                  value={companyInfo.employees}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, employees: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>1-9名</option>
                  <option>10-49名</option>
                  <option>50-99名</option>
                  <option>100-299名</option>
                  <option>300名以上</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">設立年月</label>
                <input
                  type="text"
                  value={companyInfo.established}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, established: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">資本金</label>
                <input
                  type="text"
                  value={companyInfo.capital}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, capital: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSaveCompanyInfo}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </div>

        {/* 通知設定 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">通知設定</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">新規応募通知</p>
                <p className="text-sm text-gray-500">新しい応募があった時に通知</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.newApplicant}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    newApplicant: e.target.checked,
                  })
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">メッセージ受信通知</p>
                <p className="text-sm text-gray-500">候補者からメッセージが届いた時</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.messageReceived}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    messageReceived: e.target.checked,
                  })
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">面接リマインダー</p>
                <p className="text-sm text-gray-500">面接予定日の前日にリマインド</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.interviewReminder}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    interviewReminder: e.target.checked,
                  })
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">スカウト返信通知</p>
                <p className="text-sm text-gray-500">スカウトに返信があった時</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.scoutReply}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    scoutReply: e.target.checked,
                  })
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">週次レポート</p>
                <p className="text-sm text-gray-500">毎週月曜日に活動サマリーを送信</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.emailDigest}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    emailDigest: e.target.checked,
                  })
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </label>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSaveNotifications}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </div>

        {/* アカウント管理 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">アカウント管理</h3>
          <div className="space-y-3">
            <button className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
              パスワード変更
            </button>
            <br />
            <button className="w-full md:w-auto px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-left">
              アカウント削除
            </button>
          </div>
        </div>
      </div>
    </CompanyLayout>
  )
}
