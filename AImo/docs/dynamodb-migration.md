# DynamoDB への移行ガイド

## 概要

AImotaプロジェクトをSQLite/PostgreSQL（Prisma）からAWS DynamoDBに移行しました。

## アーキテクチャ

### Single Table Design

```
テーブル名: AImotaTable
PK (パーティションキー): userId (Cognito sub)
SK (ソートキー): "USER" | "PROFILE"
```

### データ構造

#### USER アイテム
```json
{
  "pk": "cognito-uuid-xxx",
  "sk": "USER",
  "email": "user@example.com",
  "name": "山田太郎",
  "birthDate": "1990-01-01",
  "gender": "male",
  "address": "東京都渋谷区",
  "phone": "090-1234-5678",
  "photoUrl": "https://...",
  "createdAt": "2026-05-25T00:00:00.000Z",
  "updatedAt": "2026-05-25T00:00:00.000Z"
}
```

#### PROFILE アイテム
```json
{
  "pk": "cognito-uuid-xxx",
  "sk": "PROFILE",
  "skills": "{...}",
  "workHistory": "{...}",
  "desiredConditions": "{...}",
  "selfPr": "私は...",
  "question1Answer": "経験は...",
  "question2Answer": "強みは...",
  "question3Answer": "将来は...",
  "createdAt": "2026-05-25T00:00:00.000Z",
  "updatedAt": "2026-05-25T00:00:00.000Z"
}
```

## 変更されたファイル

### 新規作成
- ✅ `lib/dynamodb.ts` - DynamoDB操作ヘルパー
- ✅ `docs/dynamodb-migration.md` - このドキュメント

### 更新
- ✅ `sst.config.ts` - DynamoDB テーブル追加
- ✅ `lib/user-sync.ts` - DynamoDB対応
- ✅ `app/api/profile/route.ts` - DynamoDB操作に変更
- ✅ `app/api/profile/questions/route.ts` - DynamoDB操作に変更
- ✅ `package.json` - AWS SDK追加

### 削除不要（後方互換性のため残す）
- ⏸️ `prisma/schema.prisma` - 残す（データ参照用）
- ⏸️ `lib/db.ts` - 残す（使用されていない）
- ⏸️ `dev.db` - 残す（既存データ参照用）

## DynamoDB操作

### 基本操作

```typescript
import { 
  getUser, 
  createUser, 
  updateUser, 
  getUserProfile, 
  upsertUserProfile,
  getUserWithProfile 
} from '@/lib/dynamodb'

// ユーザー取得
const user = await getUser('cognito-uuid')

// ユーザー作成
const newUser = await createUser({
  pk: 'cognito-uuid',
  email: 'user@example.com',
  name: '山田太郎',
})

// ユーザー更新
await updateUser('cognito-uuid', {
  address: '東京都新宿区',
  phone: '090-9999-9999',
})

// プロフィール作成/更新
await upsertUserProfile('cognito-uuid', {
  question1Answer: '私の経験は...',
  question2Answer: '私の強みは...',
  question3Answer: '将来は...',
})

// ユーザー + プロフィール一括取得
const { user, profile } = await getUserWithProfile('cognito-uuid')
```

## デプロイ

### SST Dev（開発環境）

```bash
pnpm sst dev
```

これにより:
- DynamoDB テーブル作成（ローカル）
- Cognito User Pool 作成
- 環境変数自動設定

### SST Deploy（本番環境）

```bash
pnpm sst deploy --stage production
```

## ローカル開発

### DynamoDB Local（オプション）

DynamoDB Localを使用したい場合:

```bash
# DynamoDB Localインストール
docker run -p 8000:8000 amazon/dynamodb-local

# 環境変数設定
export AWS_ENDPOINT_URL=http://localhost:8000
```

### テーブル作成

```bash
# テーブル作成（SSTが自動で行う）
pnpm sst dev
```

## データ移行

### SQLite → DynamoDB

既存のSQLiteデータをDynamoDBに移行する場合:

```bash
# 移行スクリプト実行（TODO: 作成予定）
npx tsx scripts/migrate-to-dynamodb.ts
```

## パフォーマンス最適化

### GSI（Global Secondary Index）の追加

メールアドレスで検索する場合:

```typescript
// sst.config.ts に追加
const table = new sst.aws.Dynamo("AImotaTable", {
  fields: {
    pk: "string",
    sk: "string",
    email: "string",  // GSI用
  },
  primaryIndex: { hashKey: "pk", rangeKey: "sk" },
  globalIndexes: {
    emailIndex: { hashKey: "email", projection: "all" },
  },
});
```

## コスト見積もり

### DynamoDB料金（東京リージョン）

**オンデマンド料金:**
- 書き込み: $1.4375 / 100万リクエスト
- 読み取り: $0.285 / 100万リクエスト
- ストレージ: $0.285 / GB / 月

**月間10万ユーザーの場合:**
- データ量: ~5GB
- 書き込み: 500万リクエスト → $7.19
- 読み取り: 1000万リクエスト → $2.85
- ストレージ: 5GB → $1.43
- **合計: 約 $11.47 / 月**

## トラブルシューティング

### テーブルが見つからない

```bash
# SST devが起動しているか確認
pnpm sst dev

# 環境変数確認
echo $DYNAMODB_TABLE_NAME
```

### アクセス権限エラー

```bash
# IAMロール確認（SSTが自動設定）
# Lambda関数にDynamoDB権限があるか確認
```

## 参考リソース

- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [Single Table Design](https://www.alexdebrie.com/posts/dynamodb-single-table/)
- [SST DynamoDB Component](https://sst.dev/docs/component/aws/dynamo)
