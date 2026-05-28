"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupComplete() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">Hoge APP</h1>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {/* 成功アイコン */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <svg
              className="h-16 w-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">会員登録完了！</h2>

          <p className="text-base text-gray-600 mb-8">
            登録ありがとうございます。
            <br />
            あとは企業からのスカウトを待つだけ！
            <br />
            <br />
            プロフィールを充実させると、
            <br />
            スカウトが届きやすくなります。
          </p>

          {/* 完了バッジ */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-blue-700">
              <span className="text-2xl">✓</span>
              <div className="text-left">
                <p className="font-semibold">登録完了</p>
                <p className="text-sm">プロフィールが公開されました</p>
              </div>
            </div>
          </div>

          {/* 次のステップ */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">📩 次にできること</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>プロフィール写真を追加してスカウト率アップ</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>スカウトが届いたらメールでお知らせ</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>気になる求人があれば応募も可能</span>
              </li>
            </ul>
          </div>

          {/* ボタン */}
          <div className="space-y-3">
            <button
              onClick={() => router.push("/mypage")}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              マイページへ
            </button>
            <Link
              href="/"
              className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              トップページへ
            </Link>
          </div>
        </div>

        {/* プログレスバー - 完了 */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>STEP 1</span>
            <span>STEP 2</span>
            <span>STEP 3</span>
            <span>STEP 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
