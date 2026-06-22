"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getAuthSession } from "@/lib/cognito-auth"

export default function SignupStep2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    address: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) {
      newErrors.name = "氏名を入力してください"
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "生年月日を入力してください"
    }

    if (!formData.gender) {
      newErrors.gender = "性別を選択してください"
    }

    if (!formData.address) {
      newErrors.address = "住所を入力してください"
    }

    if (!formData.phone) {
      newErrors.phone = "電話番号を入力してください"
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = "有効な電話番号を入力してください"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const { tokens } = await getAuthSession()
      const idToken = tokens?.idToken?.toString()

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ submit: data.error || "更新に失敗しました" })
        setIsLoading(false)
        return
      }

      // STEP3へ遷移
      router.push("/signup/step3")
    } catch (error) {
      console.error("プロフィール更新エラー:", error)
      setErrors({ submit: "更新に失敗しました。もう一度お試しください。" })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">Hoge APP</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">基本情報入力</h2>
        <p className="mt-2 text-center text-sm text-gray-600">STEP 2 / 4: プロフィール情報</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 氏名 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                氏名
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="鈴木 太郎"
                />
              </div>
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* 生年月日 */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                生年月日
              </label>
              <div className="mt-1">
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {errors.birthDate && <p className="mt-2 text-sm text-red-600">{errors.birthDate}</p>}
            </div>

            {/* 性別 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">性別</label>
              <div className="mt-2 space-y-2">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">男性</span>
                </label>
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">女性</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">その他</span>
                </label>
              </div>
              {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
            </div>

            {/* 住所 */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                住所
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="東京都渋谷区..."
                />
              </div>
              {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* 電話番号 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                電話番号
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="090-1234-5678"
                />
              </div>
              {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* エラーメッセージ */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            )}

            {/* ボタン */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                戻る
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isLoading ? "保存中..." : "次へ（STEP 3）"}
              </button>
            </div>
          </form>
        </div>

        {/* プログレスバー */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>STEP 1</span>
            <span>STEP 2</span>
            <span>STEP 3</span>
            <span>STEP 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
