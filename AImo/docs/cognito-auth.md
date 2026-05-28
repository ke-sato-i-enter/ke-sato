# AWS Cognito 認証ガイド

## 🔐 認証アーキテクチャ

### NextAuth.js → AWS Cognito 移行

このプロジェクトはAWS Cognitoを使用してユーザー認証を実装しています。

**Cognitoの利点:**
- AWSマネージドサービス（インフラ管理不要）
- スケーラブル
- セキュリティベストプラクティス組み込み
- MFA対応
- パスワードポリシー設定
- OAuth 2.0 / OpenID Connect 対応

## 📋 認証フロー

### 1. サインアップ（会員登録）

```
ユーザー → サインアップページ
    ↓
Cognito: ユーザー作成
    ↓
メール送信: 確認コード
    ↓
ユーザー → 確認コード入力
    ↓
Cognito: メール確認
    ↓
ログイン → プロフィール入力
```

### 2. ログイン

```
ユーザー → ログインページ
    ↓
Cognito: 認証
    ↓
トークン発行:
  - ID Token (ユーザー情報)
  - Access Token (APIアクセス)
  - Refresh Token (更新用)
    ↓
アプリケーション内へ
```

### 3. パスワードリセット

```
ユーザー → パスワードリセット要求
    ↓
Cognito: 確認コード送信
    ↓
ユーザー → コード + 新パスワード入力
    ↓
Cognito: パスワード更新
    ↓
完了
```

## 🛠️ 実装詳細

### Cognitoユーザープール設定

`sst.config.ts`:
```typescript
const userPool = new sst.aws.CognitoUserPool("UserPool", {
  usernames: ["email"],
  mfa: "optional",
});
```

### 認証関数

`lib/cognito-auth.ts`:
- `signUp()` - ユーザー登録
- `confirmSignUpCode()` - メール確認
- `signIn()` - ログイン
- `signOut()` - ログアウト
- `getAuthenticatedUser()` - 現在のユーザー取得
- `initiatePasswordReset()` - パスワードリセット開始
- `completePasswordReset()` - パスワードリセット完了

### フロントエンド実装

**Amplify設定:**
```typescript
// lib/amplify-config.ts
import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
    },
  },
})
```

**ログイン:**
```typescript
import { signIn } from '@/lib/cognito-auth'

const { isSignedIn, error } = await signIn(email, password)
```

**サインアップ:**
```typescript
import { signUp, confirmSignUpCode } from '@/lib/cognito-auth'

// ステップ1: ユーザー登録
const { userId, error } = await signUp(email, password, name)

// ステップ2: 確認コード検証
const { success } = await confirmSignUpCode(email, code)
```

## 🔒 パスワードポリシー

Cognitoのデフォルトポリシー:
- 最小8文字
- 大文字を1文字以上
- 小文字を1文字以上
- 数字を1文字以上
- 特殊文字（オプション）

## 🌐 API認証

### サーバーサイドでトークン検証

```typescript
import { fetchAuthSession } from 'aws-amplify/auth/server'

export async function GET(request: Request) {
  try {
    const session = await fetchAuthSession()
    const idToken = session.tokens?.idToken?.toString()

    // トークン検証
    if (!idToken) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ユーザー情報取得
    const userId = session.tokens?.idToken?.payload.sub

    // APIロジック
    // ...
  } catch (error) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
```

## 🚀 デプロイ

### SST デプロイ時の環境変数

SSTデプロイ後、自動的に以下の環境変数が設定されます:

```bash
NEXT_PUBLIC_USER_POOL_ID="ap-northeast-1_xxxxxxxxx"
NEXT_PUBLIC_USER_POOL_CLIENT_ID="xxxxxxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_AWS_REGION="ap-northeast-1"
```

### ローカル開発

```bash
# 1. SST dev モードで起動
pnpm sst dev

# 2. 別ターミナルで Next.js 起動
pnpm dev
```

SST devモードでは、ローカルのLambda関数がAWSリソース（Cognito）と接続されます。

## 📊 Cognitoユーザー管理

### AWS Consoleでユーザー確認

```bash
# ユーザー一覧
aws cognito-idp list-users \
  --user-pool-id ap-northeast-1_xxxxxxxxx \
  --region ap-northeast-1

# 特定ユーザー情報
aws cognito-idp admin-get-user \
  --user-pool-id ap-northeast-1_xxxxxxxxx \
  --username user@example.com \
  --region ap-northeast-1
```

### ユーザー削除（開発時）

```bash
aws cognito-idp admin-delete-user \
  --user-pool-id ap-northeast-1_xxxxxxxxx \
  --username user@example.com \
  --region ap-northeast-1
```

## 🐛 トラブルシューティング

### 「User does not exist」エラー

メール確認が完了していない可能性があります。確認コードを再送信してください。

### 「Incorrect username or password」エラー

- メールアドレスが正しいか確認
- パスワードポリシーを満たしているか確認
- Caps Lockがオンになっていないか確認

### トークンの期限切れ

```typescript
import { fetchAuthSession } from 'aws-amplify/auth'

// トークン更新
const session = await fetchAuthSession({ forceRefresh: true })
```

## 📚 参考資料

- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [AWS Amplify Auth Documentation](https://docs.amplify.aws/javascript/build-a-backend/auth/)
- [SST Cognito Component](https://sst.dev/docs/component/aws/cognito-user-pool)
