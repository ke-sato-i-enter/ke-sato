import type { Metadata } from "next"
import "./globals.css"
import { AmplifyProvider } from "@/components/AmplifyProvider"

export const metadata: Metadata = {
  title: "Hoge APP - AImocプラットフォーム",
  description: "モダンなWebアプリケーションプラットフォーム",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  )
}
