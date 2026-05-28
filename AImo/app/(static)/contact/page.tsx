"use client"

import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: お問い合わせAPIの実装
    // 仮の処理として2秒待機
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitMessage("お問い合わせを受け付けました。担当者より折り返しご連絡いたします。")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Hoge APP / AImoc
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium">
              ログイン
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">お問い合わせ</h1>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-4">
            サービスに関するご質問、ご意見、不具合のご報告など、お気軽にお問い合わせください。
          </p>
          <p className="text-sm text-gray-600">
            ※ お問い合わせへの回答には2〜3営業日いただく場合がございます。
          </p>
        </div>

        {submitMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-green-800">{submitMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* お名前 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="鈴木 太郎"
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@example.com"
            />
          </div>

          {/* 件名 */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              件名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="お問い合わせ内容の概要"
            />
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={8}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="お問い合わせ内容を詳しくご記入ください"
            />
          </div>

          {/* 送信ボタン */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "送信中..." : "送信する"}
            </button>
          </div>
        </form>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">よくあるお問い合わせ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Q. 登録は本当に無料ですか？</h3>
              <p className="text-sm text-gray-700">
                A.
                はい、完全無料です。会員登録から企業へのスカウト応募まで、すべての機能を無料でご利用いただけます。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Q. スカウトはいつ届きますか？</h3>
              <p className="text-sm text-gray-700">
                A.
                プロフィール登録後、最短で翌日からスカウトが届きます。プロフィールの充実度によって届く頻度が変わります。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Q. 退会はできますか？</h3>
              <p className="text-sm text-gray-700">
                A. はい、いつでもマイページから退会手続きが可能です。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
