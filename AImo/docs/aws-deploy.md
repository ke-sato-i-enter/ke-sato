# SST AWS デプロイガイド

## 🚀 前提条件

### AWS CLIのインストールと設定

```bash
# AWS CLI v2 をインストール（macOS）
brew install awscli

# AWSクレデンシャル設定
aws configure
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region name: ap-northeast-1
# Default output format: json
```

### IAM権限

デプロイに必要な権限:
- CloudFormation
- S3
- Lambda
- CloudFront
- IAM（ロール作成）
- API Gateway
- Route53（カスタムドメイン使用時）

## 📦 セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.production` を作成:

```bash
# データベース（本番環境）
DATABASE_URL="postgresql://user:password@your-rds-endpoint:5432/aimota"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret-key"

# AWS S3（アップロード用）
NEXT_PUBLIC_UPLOAD_BUCKET="aimota-uploads-production"
AWS_REGION="ap-northeast-1"
```

## 🌍 デプロイ

### 開発環境へのデプロイ

```bash
# 初回デプロイ（開発環境）
pnpm sst deploy --stage dev

# 開発環境の削除
pnpm sst remove --stage dev
```

### 本番環境へのデプロイ

```bash
# 本番環境にデプロイ
pnpm sst deploy --stage production

# デプロイ後、出力されるURLを確認
# 例: https://d111111abcdef8.cloudfront.net
```

## 🔧 SST コマンド

```bash
# ローカル開発（SST Live Lambda Development）
pnpm sst dev

# コンソールを開く
pnpm sst console

# リソースの確認
pnpm sst list

# ログの確認
pnpm sst logs --stage production

# 環境変数の設定
pnpm sst secret set NEXTAUTH_SECRET "your-secret" --stage production

# 環境変数の確認
pnpm sst secret list --stage production
```

## 📊 アーキテクチャ

```
┌─────────────────────────────────────────────────────┐
│               CloudFront (CDN)                      │
│  - グローバル配信                                    │
│  - キャッシュ最適化                                  │
└────────────┬────────────────────────────────────────┘
             │
             ├─── S3 Bucket
             │    └─ 静的ファイル（_next/static/）
             │
             ├─── Lambda@Edge
             │    └─ SSR（Server-Side Rendering）
             │
             └─── Lambda Functions
                  └─ API Routes（/api/*）

┌─────────────────────────────────────────────────────┐
│          S3 Bucket (Uploads)                        │
│  - ユーザーアップロード画像・動画                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│          RDS PostgreSQL（別途作成）                  │
│  - ユーザーデータ                                    │
│  - プロフィール情報                                  │
└─────────────────────────────────────────────────────┘
```

## 💰 コスト見積もり

### 無料枠内の使用量（月間）
- **CloudFront**: 1TB転送、10,000,000リクエスト
- **Lambda**: 100万リクエスト、40万GB-秒
- **S3**: 5GB ストレージ、20,000 GETリクエスト

### 想定コスト（無料枠超過後）
- CloudFront: $0.114/GB（東京リージョン）
- Lambda: $0.20/100万リクエスト
- S3: $0.025/GB/月

**MVP段階では無料枠内で運用可能**

## 🔒 セキュリティ

### 環境変数の管理

```bash
# 本番環境の機密情報を設定
pnpm sst secret set DATABASE_URL "postgresql://..." --stage production
pnpm sst secret set NEXTAUTH_SECRET "..." --stage production

# 確認
pnpm sst secret list --stage production
```

### IAMロール

SSTが自動で作成するIAMロール:
- Lambda実行ロール
- CloudFront Origin Access Identity
- S3アクセス権限

## 🌐 カスタムドメイン設定

### Route53 + ACM証明書

`sst.config.ts` を更新:

```typescript
const site = new sst.aws.Nextjs("AImotaSite", {
  domain: {
    name: "tapme.example.com",
    dns: sst.cloudflare.dns(), // または sst.aws.dns()
  },
  // ...
});
```

### デプロイ

```bash
# カスタムドメインでデプロイ
pnpm sst deploy --stage production
```

## 📈 モニタリング

### CloudWatch

```bash
# ログ確認
pnpm sst logs --stage production

# 特定の関数のログ
pnpm sst logs --stage production --function AImotaSite
```

### SST Console

```bash
# ブラウザでコンソールを開く
pnpm sst console
```

- リアルタイムログ
- 関数の実行状況
- エラートラッキング
- リソース使用量

## 🔄 CI/CD（GitHub Actions）

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-1
      
      - name: Deploy to AWS
        run: pnpm sst deploy --stage production
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
```

## 🐛 トラブルシューティング

### デプロイが失敗する

```bash
# スタックの状態確認
aws cloudformation describe-stacks --region ap-northeast-1

# SSTのデバッグモード
pnpm sst deploy --stage dev --verbose
```

### Lambda関数のタイムアウト

`sst.config.ts` で設定:

```typescript
const site = new sst.aws.Nextjs("AImotaSite", {
  server: {
    timeout: "30 seconds",
  },
});
```

### メモリ不足

```typescript
const site = new sst.aws.Nextjs("AImotaSite", {
  server: {
    memory: "1024 MB",
  },
});
```

## 📚 参考資料

- [SST Documentation](https://sst.dev/)
- [SST + Next.js Guide](https://sst.dev/docs/start/nextjs)
- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
- [CloudFront Pricing](https://aws.amazon.com/cloudfront/pricing/)
