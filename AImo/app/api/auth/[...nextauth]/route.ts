/**
 * NextAuth.js v5 API Route Handler
 *
 * すべての認証関連のリクエスト（ログイン、ログアウト、セッション取得等）を処理
 *
 * エンドポイント:
 * - POST /api/auth/signin/credentials - ログイン
 * - POST /api/auth/signout - ログアウト
 * - GET /api/auth/session - セッション取得
 * - GET /api/auth/csrf - CSRF トークン取得
 * - GET /api/auth/providers - プロバイダー一覧取得
 */

import { handlers } from "@/lib/auth"

export const { GET, POST } = handlers
