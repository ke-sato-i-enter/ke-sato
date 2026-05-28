"use client"

import { useState } from "react"
import CompanyLayout from "@/components/company/CompanyLayout"

interface Message {
  id: string
  candidateId: string
  candidateName: string
  candidatePhoto: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isRead: boolean
}

interface ChatMessage {
  id: string
  senderId: string
  senderType: "company" | "candidate"
  message: string
  timestamp: string
}

const sampleMessages: Message[] = [
  {
    id: "1",
    candidateId: "1",
    candidateName: "佐藤 太郎",
    candidatePhoto: "https://ui-avatars.com/api/?name=A+Sample&background=4F46E5&color=fff",
    lastMessage: "面接日程について、来週の火曜日は可能でしょうか？",
    lastMessageTime: "2026-05-25 10:30",
    unreadCount: 2,
    isRead: false,
  },
  {
    id: "2",
    candidateId: "2",
    candidateName: "田中 花子",
    candidatePhoto: "https://ui-avatars.com/api/?name=B+User&background=10B981&color=fff",
    lastMessage: "ありがとうございます。よろしくお願いいたします。",
    lastMessageTime: "2026-05-24 16:45",
    unreadCount: 0,
    isRead: true,
  },
  {
    id: "3",
    candidateId: "3",
    candidateName: "鈴木 一郎",
    candidatePhoto: "https://ui-avatars.com/api/?name=C+Demo&background=F59E0B&color=fff",
    lastMessage: "内定のお返事ありがとうございます。",
    lastMessageTime: "2026-05-24 14:20",
    unreadCount: 0,
    isRead: true,
  },
  {
    id: "4",
    candidateId: "4",
    candidateName: "鈴木 花子",
    candidatePhoto: "https://ui-avatars.com/api/?name=D+Test&background=EC4899&color=fff",
    lastMessage: "こんにちは。応募させていただきました。",
    lastMessageTime: "2026-05-22 09:15",
    unreadCount: 1,
    isRead: false,
  },
]

const sampleChatMessages: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "1",
      senderId: "company",
      senderType: "company",
      message:
        "こんにちは。書類選考通過のご連絡です。面接日程を調整させていただきたいのですが、ご都合はいかがでしょうか?",
      timestamp: "2026-05-24 15:00",
    },
    {
      id: "2",
      senderId: "1",
      senderType: "candidate",
      message: "ご連絡ありがとうございます。来週でしたら平日の午後が可能です。",
      timestamp: "2026-05-24 17:30",
    },
    {
      id: "3",
      senderId: "company",
      senderType: "company",
      message: "ありがとうございます。それでは来週火曜日の14時はいかがでしょうか?",
      timestamp: "2026-05-25 09:00",
    },
    {
      id: "4",
      senderId: "1",
      senderType: "candidate",
      message: "面接日程について、来週の火曜日は可能でしょうか？",
      timestamp: "2026-05-25 10:30",
    },
  ],
}

export default function MessagesPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    sampleMessages[0]?.id || null
  )
  const [newMessage, setNewMessage] = useState("")

  const selectedMessage = sampleMessages.find((m) => m.id === selectedMessageId)
  const chatMessages = selectedMessageId ? sampleChatMessages[selectedMessageId] || [] : []

  const unreadTotal = sampleMessages.reduce((sum, msg) => sum + msg.unreadCount, 0)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // TODO: API連携
    console.log("Sending message:", newMessage)
    setNewMessage("")
    alert("メッセージを送信しました")
  }

  return (
    <CompanyLayout title="メッセージ" subtitle={`未読: ${unreadTotal}件`}>
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* メッセージリスト */}
        <div className="w-80 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="候補者を検索..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {sampleMessages.map((message) => (
              <button
                key={message.id}
                onClick={() => setSelectedMessageId(message.id)}
                className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                  selectedMessageId === message.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={message.candidatePhoto}
                    alt={message.candidateName}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{message.candidateName}</p>
                      {message.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {message.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.lastMessageTime}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* チャットエリア */}
        <div className="flex-1 bg-white rounded-lg shadow flex flex-col">
          {selectedMessage ? (
            <>
              {/* チャットヘッダー */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedMessage.candidatePhoto}
                    alt={selectedMessage.candidateName}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedMessage.candidateName}
                    </p>
                    <p className="text-xs text-gray-500">オンライン</p>
                  </div>
                </div>
              </div>

              {/* メッセージ表示エリア */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderType === "company" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-lg ${
                        msg.senderType === "company"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.senderType === "company" ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* メッセージ入力エリア */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="メッセージを入力..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    送信
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              メッセージを選択してください
            </div>
          )}
        </div>
      </div>
    </CompanyLayout>
  )
}
