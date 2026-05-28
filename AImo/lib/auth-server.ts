import { CognitoJwtVerifier } from "aws-jwt-verify"
import type { NextRequest } from "next/server"

// Cognito JWT検証器のセットアップ（環境変数が設定されている場合のみ）
const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID
const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID

const verifier =
  userPoolId && clientId
    ? CognitoJwtVerifier.create({
        userPoolId,
        tokenUse: "id",
        clientId,
      })
    : null

export interface CognitoUser {
  sub: string
  email?: string
  name?: string
  "cognito:username": string
}

/**
 * リクエストヘッダーからIDトークンを取得して検証
 */
export async function verifyAuthToken(request: NextRequest): Promise<CognitoUser | null> {
  try {
    // Cognitoが未設定の場合はnullを返す
    if (!verifier) {
      console.warn("⚠️ Cognito not configured. Token verification skipped.")
      return null
    }

    // Authorization ヘッダーからトークン取得
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.substring(7)

    // トークン検証
    const payload = await verifier.verify(token)

    return payload as CognitoUser
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

/**
 * 認証必須のAPIルート用ミドルウェア
 */
export async function requireAuth(
  request: NextRequest
): Promise<{ user: CognitoUser; error: null } | { user: null; error: Response }> {
  const user = await verifyAuthToken(request)

  if (!user) {
    return {
      user: null,
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  return { user, error: null }
}
