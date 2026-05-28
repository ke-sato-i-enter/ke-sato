# Cognito + Prisma ユーザー同期設計

## 概要

AImotaアプリケーションでは、AWS Cognitoで認証を行い、Prisma（SQLite/PostgreSQL）でユーザープロファイルデータを管理します。

## アーキテクチャ

```
┌─────────────────┐
│  AWS Cognito    │  認証専用
│  ・サインアップ  │  ・メール確認
│  ・ログイン      │  ・パスワード管理
│  ・JWT発行      │  ・MFA（オプション）
└────────┬────────┘
         │ JWT Token
         │ (sub, email, name)
         ▼
┌─────────────────┐
│  Next.js API    │  
│  /api/profile   │  認証チェック + DB同期
│  /api/profile/  │  
│    questions    │  
└────────┬────────┘
         │ Auto-sync
         ▼
┌─────────────────┐
│  Prisma DB      │  プロファイルデータ
│  ・基本情報      │  ・スキル・経歴
│  ・Q&A回答      │  ・希望条件
└─────────────────┘
```

## データフロー

### 1. ユーザー登録

```typescript
// クライアント側
const { userId } = await signUp(email, password, name)
// → Cognitoにユーザー作成
// → メール確認待ち
```

### 2. 初回プロフィールアクセス時

```typescript
// /api/profile GET
1. JWT検証（Cognito）
2. getOrCreateUser(cognitoUser)
   ├─ Prisma DBにユーザー存在？
   │  YES → 既存ユーザー取得
   │  NO  → 新規ユーザー作成 ✨
   │         - id: cognito.sub
   │         - email: cognito.email
   │         - name: cognito.name
   │         - passwordHash: ''
   └─ ユーザー返却
3. プロファイルデータ取得
```

### 3. プロフィール更新

```typescript
// /api/profile PUT
1. JWT検証
2. getOrCreateUser() → DB同期
3. prisma.user.update()
```

## 実装詳細

### lib/user-sync.ts

```typescript
/**
 * CognitoユーザーをPrisma DBと同期
 * ユーザーが存在しない場合は自動作成
 */
export async function getOrCreateUser(cognitoUser: CognitoUser) {
  const email = cognitoUser.email || `${cognitoUser.sub}@cognito.local`

  let dbUser = await prisma.user.findUnique({
    where: { email },
  })

  if (!dbUser) {
    // 初回アクセス時に自動作成
    dbUser = await prisma.user.create({
      data: {
        id: cognitoUser.sub, // CognitoのsubをIDとして使用
        email,
        passwordHash: '', // Cognitoで管理
        name: cognitoUser.name || null,
      },
    })
    console.log(`✓ Created new user in DB: ${email}`)
  }

  return dbUser
}
```

## データモデル

### Cognito（認証）
- sub (UUID) - ユーザー一意識別子
- email - メールアドレス
- name - 氏名
- password - パスワードハッシュ（Cognito管理）

### Prisma User（プロファイル）
- id (UUID) - Cognitoのsubをそのまま使用
- email - Cognitoと同期
- name - 基本情報
- birthDate, gender, address, phone - ステップ2で入力
- passwordHash - 空文字列（Cognitoで管理）

### Prisma UserProfile（詳細）
- userId - Userへの外部キー
- question1Answer, question2Answer, question3Answer - Q&A
- skills, workHistory, desiredConditions - JSON

## メリット

✅ **シンプル**: ユーザーが初めてAPIにアクセスした時に自動同期
✅ **冪等性**: 何度呼んでも安全（既存ユーザーは作成しない）
✅ **透過的**: アプリケーションコードは同期を意識不要
✅ **スケーラブル**: Cognitoが認証をすべて管理
✅ **セキュア**: パスワードはCognitoのみが管理

## 注意点

⚠️ **Cognitoのsubが変わらないこと**: subはユーザーの永続的な識別子
⚠️ **メールアドレス変更**: Cognitoで変更した場合、Prisma側も手動更新が必要
⚠️ **削除**: Cognitoから削除した場合、Prisma側は残る（手動削除推奨）

## トラブルシューティング

### ユーザーが見つからない

```bash
# Cognitoユーザー確認
aws cognito-idp list-users \
  --user-pool-id ap-northeast-1_xxxxxxxxx

# Prismaユーザー確認
sqlite3 dev.db "SELECT id, email, name FROM users;"
```

### 同期ログ確認

サーバーコンソールに以下のログが出力されます:
```
✓ Created new user in DB for Cognito user: user@example.com
```

## テスト手順

1. Cognitoでユーザー登録
2. メール確認
3. ログイン
4. `/signup/step2` にアクセス
5. プロフィール入力 → PUT /api/profile
6. **初回アクセス時にPrisma DBにユーザー自動作成** ✨
7. データベース確認:
   ```bash
   sqlite3 dev.db "SELECT * FROM users WHERE email='user@example.com';"
   ```
