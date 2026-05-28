import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Hoge APP / AImoc
              </Link>
            </div>
            <div>
              <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium">
                ログイン
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hoge APP
              <br />
              AImocプラットフォーム
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8">
              モダンな技術で構築された
              <br />
              次世代Webアプリケーション
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                無料で会員登録する ›
              </Link>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>所要時間 約30秒</span>
                <span>✓ 完全無料</span>
                <span>✓ 履歴書不要</span>
                <span>✓ 1分で登録完了</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            FEATURES
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">Hoge APPの3つの特徴</p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                POINT 01
                <br />
                履歴書、職務経歴書 不要
              </h3>
              <p className="text-gray-600 mb-4">
                面倒な書類作成は一切なし。プロフィール登録は最短30秒で完了します。氏名・住所・経歴は選択式で入力できます。
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ 書類作成 0分</li>
                <li>✓ 選択式入力で簡単</li>
                <li>✓ 下書き保存OK</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                POINT 02
                <br />
                Q&A 3問で自己PR
              </h3>
              <p className="text-gray-600 mb-4">
                ため口でも大丈夫。AIが自動で敬語に変換します。志望動機を考えなくても、あなたらしさが企業に伝わります。
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ ため口でOK</li>
                <li>✓ AIが敬語変換</li>
                <li>✓ 修正もカンタン</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📩</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                POINT 03
                <br />
                企業からスカウトが届く
              </h3>
              <p className="text-gray-600 mb-4">
                あなたが応募する手間はなし。プロフィールを見た企業から直接スカウトが届きます。気になる企業だけ返信すればOK。
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ 待つだけ採用</li>
                <li>✓ 最短即日でスカウト</li>
                <li>✓ ピンと来たものだけ返信</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Voices Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">VOICES</h2>
          <p className="text-xl text-center text-gray-600 mb-16">利用者の声</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Voice 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">20代女性 / 飲食</p>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">履歴書を書かずに済んだ</h4>
              <p className="text-gray-600 text-sm">
                前職を辞めてから3社の転職サービスを使ったけど、履歴書も職務経歴書も書かなくていいのはHoge
                APPだけ。Q&Aもため口でOKで、AIが自動で敬語に直してくれるからラクでした。
              </p>
            </div>

            {/* Voice 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">30代男性 / 介護</p>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">登録3日で5件のスカウト</h4>
              <p className="text-gray-600 text-sm">
                プロフィール写真と動画を載せたら、登録した翌日からスカウトが3件来ました。自分から応募しなくても何社かから来てくれるので応募の手間が省けるし、選考もスムーズでした。
              </p>
            </div>

            {/* Voice 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">20代女性 / 小売</p>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">人柄を見てもらえた</h4>
              <p className="text-gray-600 text-sm">
                学歴やスキルだけで判断されるのが嫌だったけど、Hoge
                APP経由のQ&Aで自分の人柄を伝えられたのか、面接前から「いいな」と言ってもらえる企業に出会えました。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">ご利用の流れ</p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">📝 プロフィール登録</h3>
              <p className="text-gray-600">基本情報とQ&A 3問を入力。AIが敬語に変換。</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">📩 スカウト受信</h3>
              <p className="text-gray-600">
                プロフィールを見た企業からスカウトメッセージがメールで届きます。
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 応募・面接</h3>
              <p className="text-gray-600">
                気になるスカウトに返信。あとは企業と日程調整して面接へ。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            登録は約30秒。
            <br />
            まずは気軽に登録してみませんか?
          </h2>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-100 transition-colors mb-4"
          >
            無料で会員登録する ›
          </Link>
          <p className="text-white text-sm mb-8">所要時間 約30秒</p>
          <p className="text-white text-sm">
            既にアカウントをお持ちの方は{" "}
            <Link href="/login" className="underline hover:text-blue-100">
              ログイン
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <p className="text-2xl font-bold mb-8">Hoge APP / AImoc</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/terms" className="hover:text-gray-300">
                利用規約
              </Link>
              <Link href="/privacy" className="hover:text-gray-300">
                プライバシーポリシー
              </Link>
              <Link href="/company" className="hover:text-gray-300">
                運営会社
              </Link>
              <Link href="/contact" className="hover:text-gray-300">
                お問い合わせ
              </Link>
              <Link href="/careers" className="hover:text-gray-300">
                採用情報
              </Link>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400">
            © 2026 Sample Technologies Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
