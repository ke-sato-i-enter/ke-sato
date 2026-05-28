import Link from "next/link"

export default function CareersPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">採用情報</h1>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">一緒に働く仲間を募集しています</h2>
          <p className="text-lg">
            Hoge APPは、最先端の技術で新しい価値を創造し、
            <br />
            人と企業の新しい出会い方を実現するスタートアップです。
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">私たちが目指すもの</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-bold text-gray-900 mb-2">革新的なサービス</h3>
              <p className="text-sm text-gray-700">
                従来の履歴書ベースの就職活動を変革し、シンプルで効率的なマッチングを実現します。
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-bold text-gray-900 mb-2">フラットな組織文化</h3>
              <p className="text-sm text-gray-700">
                年齢や役職に関係なく、誰もがアイデアを出し合い、挑戦できる環境です。
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="font-bold text-gray-900 mb-2">成長機会</h3>
              <p className="text-sm text-gray-700">
                急成長中のサービスで、新しい技術やビジネスモデルに挑戦し続けられます。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">募集職種</h2>
          <div className="space-y-6">
            {/* フロントエンドエンジニア */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">フロントエンドエンジニア</h3>
                  <p className="text-sm text-gray-600">正社員 / リモート可</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  募集中
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                Next.js、React、TypeScriptを使用したWebアプリケーション開発を担当していただきます。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Next.js</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">React</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  TypeScript
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  Tailwind CSS
                </span>
              </div>
            </div>

            {/* バックエンドエンジニア */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">バックエンドエンジニア</h3>
                  <p className="text-sm text-gray-600">正社員 / リモート可</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  募集中
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                API設計・開発、データベース設計、インフラ構築などを担当していただきます。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Node.js</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Prisma</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  PostgreSQL
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS</span>
              </div>
            </div>

            {/* ビジネス開発 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">ビジネス開発</h3>
                  <p className="text-sm text-gray-600">正社員</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  募集中
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                企業向けの営業活動、パートナーシップ構築、マーケティング戦略立案などを担当していただきます。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  営業経験
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  マーケティング
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">HR Tech</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">福利厚生</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>リモートワーク可（週1〜2日出社推奨）</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>フレックスタイム制</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>各種社会保険完備</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>書籍購入費補助（月1万円まで）</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>最新MacBook Pro支給</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>技術カンファレンス参加費補助</span>
            </li>
          </ul>
        </section>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">ご応募をお待ちしています</h3>
          <p className="text-gray-700 mb-6">
            まずはカジュアルな面談からでもOKです。
            <br />
            お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            応募・お問い合わせ
          </Link>
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
