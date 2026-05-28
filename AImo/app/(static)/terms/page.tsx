import Link from "next/link"

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">利用規約</h1>

        <div className="prose prose-blue max-w-none">
          <p className="text-sm text-gray-600 mb-8">最終更新日: 2026年5月25日</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">第1条（適用）</h2>
            <p className="text-gray-700 mb-4">
              本利用規約（以下「本規約」といいます。）は、株式会社サンプルテクノロジーズ（以下「当社」といいます。）が提供するWebアプリケーションプラットフォーム「Hoge
              APP」（以下「本サービス」といいます。）の利用条件を定めるものです。
            </p>
            <p className="text-gray-700 mb-4">
              ユーザーの皆様（以下「ユーザー」といいます。）には、本規約に従って本サービスをご利用いただきます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">第2条（利用登録）</h2>
            <p className="text-gray-700 mb-4">
              本サービスの利用を希望する方は、本規約に同意の上、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
            </p>
            <p className="text-gray-700 mb-4">
              当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他、当社が利用登録を相当でないと判断した場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">第3条（アカウント管理）</h2>
            <p className="text-gray-700 mb-4">
              ユーザーは、自己の責任において、本サービスのアカウント情報を適切に管理するものとします。
            </p>
            <p className="text-gray-700 mb-4">
              ユーザーは、いかなる場合にも、アカウント情報を第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">第4条（禁止事項）</h2>
            <p className="text-gray-700 mb-4">
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>虚偽の情報を登録する行為</li>
              <li>
                当社、ほかのユーザー、またはその他第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
              </li>
              <li>本サービスのネットワークまたはシステム等に過度な負荷をかける行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              第5条（本サービスの提供の停止等）
            </h2>
            <p className="text-gray-700 mb-4">
              当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>
                地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
              </li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当社が本サービスの提供が困難と判断した場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              第6条（利用制限および登録抹消）
            </h2>
            <p className="text-gray-700 mb-4">
              当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>本規約のいずれかの条項に違反した場合</li>
              <li>登録事項に虚偽の事実があることが判明した場合</li>
              <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">第7条（免責事項）</h2>
            <p className="text-gray-700 mb-4">
              当社は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当社とユーザーとの間の契約が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">第8条（サービス内容の変更等）</h2>
            <p className="text-gray-700 mb-4">
              当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">第9条（利用規約の変更）</h2>
            <p className="text-gray-700 mb-4">
              当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。変更後の本規約は、本ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">第10条（準拠法・裁判管轄）</h2>
            <p className="text-gray-700 mb-4">本規約の解釈にあたっては、日本法を準拠法とします。</p>
            <p className="text-gray-700 mb-4">
              本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <p className="text-sm text-gray-600 mt-12">以上</p>
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
