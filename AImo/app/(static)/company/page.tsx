import Link from "next/link"

export default function CompanyPage() {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">運営会社</h1>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                  会社名
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">株式会社サンプルテクノロジーズ</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                  代表者
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">代表取締役 佐藤 健太</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                  設立
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">2020年4月1日</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                  所在地
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  〒105-0001
                  <br />
                  東京都港区サンプル1-2-3 サンプルビル5F
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                  事業内容
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Webアプリケーションプラットフォームの企画・開発・運営</li>
                    <li>SaaSサービスの提供</li>
                    <li>ITコンサルティング事業</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                  資本金
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">1,000万円</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                  取引銀行
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">サンプル銀行 本店</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                  お問い合わせ
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                    お問い合わせフォーム
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">私たちのミッション</h2>
          <p className="text-gray-700 mb-4">
            Hoge
            APPは、モダンな技術スタックで構築されたWebアプリケーションプラットフォームです。ユーザー体験を最優先に設計されています。
          </p>
          <p className="text-gray-700">
            忙しい現代人の時間を大切にし、本当に必要な情報だけで効率的に仕事を見つけられる世界を目指しています。
          </p>
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
