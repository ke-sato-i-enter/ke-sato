# AWS デプロイ チェックリスト

## 📋 デプロイ前の準備

### 1. AWS CLIのセットアップ
- [ ] AWS CLI v2 インストール済み
- [ ] `aws configure` でクレデンシャル設定済み
- [ ] IAM権限確認（CloudFormation, Lambda, S3, CloudFront, IAM）

### 2. 環境変数の準備
- [ ] `.env.production` ファイル作成
- [ ] DATABASE_URL 設定（PostgreSQL接続文字列）
- [ ] NEXTAUTH_SECRET 生成（`openssl rand -base64 32`）
- [ ] NEXTAUTH_URL 設定（本番ドメイン）

### 3. データベースの準備
- [ ] 本番用PostgreSQLデータベース作成
  - RDS PostgreSQL または
  - Supabase / Neon（推奨）
- [ ] データベース接続テスト
- [ ] Prisma マイグレーション実行
  ```bash
  DATABASE_URL="postgresql://..." npx prisma migrate deploy
  ```

### 4. コードの確認
- [ ] 型チェック成功: `pnpm type-check`
- [ ] テスト成功: `pnpm test:run`
- [ ] ビルド成功: `pnpm build`
- [ ] Gitにコミット済み

## 🚀 デプロイ手順

### 開発環境（dev stage）

```bash
# 1. 環境変数をSST Secretsに設定
pnpm sst secret set DATABASE_URL "postgresql://..." --stage dev
pnpm sst secret set NEXTAUTH_SECRET "..." --stage dev

# 2. デプロイ
pnpm sst:deploy

# 3. URLを確認
# 出力例: https://d111111abcdef8.cloudfront.net
```

### 本番環境（production stage）

```bash
# 1. 環境変数をSST Secretsに設定
pnpm sst secret set DATABASE_URL "postgresql://..." --stage production
pnpm sst secret set NEXTAUTH_SECRET "..." --stage production

# 2. 本番デプロイ
pnpm sst:deploy:prod

# 3. URLを確認し、動作テスト
```

## ✅ デプロイ後の確認

### 基本動作確認
- [ ] トップページが表示される
- [ ] 会員登録が機能する
- [ ] ログインが機能する
- [ ] プロフィール編集が機能する
- [ ] 画像アップロードが機能する（S3連携）
- [ ] 企業側ダッシュボードが表示される

### パフォーマンス確認
- [ ] PageSpeed Insights でスコア確認
- [ ] CloudFront キャッシュが動作している
- [ ] Lambda 関数のコールドスタート時間確認

### セキュリティ確認
- [ ] HTTPS接続
- [ ] セキュリティヘッダー設定
- [ ] CORS設定
- [ ] 環境変数が漏れていない

## 🔧 トラブルシューティング

### デプロイエラー

```bash
# スタック状態確認
aws cloudformation describe-stacks --region ap-northeast-1

# 詳細ログ
pnpm sst deploy --stage dev --verbose

# スタック削除（やり直す場合）
pnpm sst:remove
```

### データベース接続エラー

```bash
# 接続テスト
DATABASE_URL="postgresql://..." npx prisma db pull

# マイグレーション状態確認
DATABASE_URL="postgresql://..." npx prisma migrate status
```

### Lambda タイムアウト

`sst.config.ts` で調整:
```typescript
const site = new sst.aws.Nextjs("AImotaSite", {
  server: {
    timeout: "30 seconds",
    memory: "1024 MB",
  },
});
```

## 💰 コスト管理

### 無料枠の確認
- CloudFront: 1TB/月
- Lambda: 100万リクエスト/月
- S3: 5GB ストレージ

### コスト監視
```bash
# AWS Cost Explorer で確認
aws ce get-cost-and-usage \
  --time-period Start=2026-05-01,End=2026-05-31 \
  --granularity MONTHLY \
  --metrics BlendedCost
```

## 🌐 カスタムドメイン設定

### Route53 + ACM証明書

1. Route53でホストゾーン作成
2. ACM証明書リクエスト（us-east-1リージョン）
3. `sst.config.ts` 更新:

```typescript
const site = new sst.aws.Nextjs("AImotaSite", {
  domain: {
    name: "tapme.example.com",
    dns: sst.aws.dns(),
  },
});
```

4. 再デプロイ: `pnpm sst:deploy:prod`

## 📊 モニタリング

### CloudWatch Logs

```bash
# ログ確認
pnpm sst logs --stage production

# リアルタイムログ
pnpm sst logs --stage production --tail
```

### SST Console

```bash
# ブラウザでコンソール起動
pnpm sst:console
```

## 🔄 CI/CD（GitHub Actions）

### Secrets設定

GitHub リポジトリの Settings → Secrets and variables → Actions で以下を設定:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DEV_DATABASE_URL`
- `DEV_NEXTAUTH_SECRET`
- `PROD_DATABASE_URL`
- `PROD_NEXTAUTH_SECRET`

### 自動デプロイ

- `main` ブランチ → dev stage に自動デプロイ
- `production` ブランチ → production stage に自動デプロイ

## 📝 メモ

デプロイ日: ____________________
デプロイURL: ____________________
データベース: ____________________
問題点: ____________________
