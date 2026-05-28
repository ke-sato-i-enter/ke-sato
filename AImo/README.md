# Hoge APP - AImocプラットフォーム

Next.js + AWS + DynamoDBで構築されたモダンなWebアプリケーションプラットフォーム。

## プロジェクト概要

Hoge APP（AImoc）は、モダンな技術スタックで構築されたWebアプリケーションプラットフォームです。

### 主な機能

**求職者向け**
- 会員登録（4ステップ）・ログイン・パスワードリセット
- プロフィール編集・写真アップロード
- 求人一覧・詳細閲覧・応募
- スカウト受信・閲覧
- マイページ（応募履歴・退会）

**管理者・企業向け**
- テナント管理（スーパー管理者）
- ユーザー管理・求職者検索
- 求人登録・編集・CSV 一括アップロード
- スカウト送信・応募者管理
- 管理ダッシュボード

**AI 機能**
- Amazon Bedrock（Claude 3 Haiku）による敬語変換

## プロジェクト構成

```
sample-webapp/
├── app/                 # Next.js App Router（ページ・レイアウト）
│   ├── (auth)/         # 認証関連ページ
│   ├── (company)/      # 企業向けページ
│   ├── (static)/       # 静的ページ（プライバシーポリシー等）
│   └── api/            # API Routes
├── components/          # Reactコンポーネント
│   ├── company/        # 企業向けコンポーネント
│   ├── profile/        # プロフィール関連
│   └── ui/             # UI共通コンポーネント
├── lib/                 # ユーティリティ・ライブラリ
│   ├── amplify-config.ts  # AWS Amplify設定
│   ├── auth-server.ts    # サーバーサイド認証
│   ├── dynamodb.ts       # DynamoDB操作
│   └── user-sync.ts      # ユーザー同期
├── public/              # 静的ファイル
├── scripts/             # デプロイ・運用スクリプト
├── docs/                # ドキュメント
└── sst.config.ts        # SST設定（インフラ定義）
```

### AWS インフラ構成

| リソース | 説明 |
|---------|------|
| Cognito User Pool | ユーザー認証・認可 |
| DynamoDB Table | ユーザーデータ・プロフィール（Single Table Design） |
| S3 Bucket | アップロードファイル保管（AES256暗号化） |
| CloudFront | グローバル配信（TLS v1.2強制、日本リージョン制限） |
| Lambda | Next.js サーバーサイドレンダリング |
| SST | インフラ as Code 管理 |

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| **ランタイム** | Node.js 22+ |
| **フロントエンド** | Next.js 16, React 19, TypeScript 5.9 |
| **スタイリング** | Tailwind CSS, shadcn/ui |
| **認証** | AWS Amplify SDK 6, Cognito User Pool |
| **DB** | Amazon DynamoDB（Single Table Design, pk/sk） |
| **ストレージ** | Amazon S3（AES256暗号化） |
| **インフラ** | SST 4, AWS CDK 2 |
| **テスト** | Vitest 4, Playwright 1.60 |
| **リンター/フォーマッター** | Biome 2 |

## セットアップ

### 前提条件

- Node.js 22+
- pnpm 9+
- AWS CLI（認証プロファイル設定済み）

### インストール

```bash
pnpm install
```

### ローカル開発

```bash
# 開発サーバー起動
pnpm dev
```

ブラウザで http://localhost:3000 を開きます。

### ビルド

```bash
pnpm build
```

### テスト実行

```bash
bash scripts/setup-local-dynamodb.sh
```

#### 3. S3 バケット作成（LocalStack）

```bash
bash scripts/setup-local-s3.sh
```

AWS環境にデプロイされたリソースを使用します。

#### 4. テストデータ投入（任意）

```bash
bash scripts/seed-local-dynamodb.sh
```

#### 5. 開発サーバー起動

```bash
bun run dev
```

---

**ワンライナー（初回セットアップ）**

```bash
docker compose up -d \
  && bash scripts/setup-local-dynamodb.sh \
  && bash scripts/setup-local-s3.sh \
  && bun run dev
```

| サービス | URL |
|---------|-----|
| クライアント | http://localhost:5173 |
| サーバー | http://localhost:3000 |
| DynamoDB Local | http://localhost:8000 |
| DynamoDB Admin UI | http://localhost:8001 |
| LocalStack（S3） | http://localhost:4566 |

### 環境変数

**client/.env**
```env
VITE_SERVER_URL=http://localhost:3000       # ローカル開発時のみ（デプロイ時は /api）
VITE_COGNITO_USER_POOL_ID=ap-northeast-1_xxxxx
VITE_COGNITO_CLIENT_ID=xxxxx
VITE_JOBSEEKER_COGNITO_USER_POOL_ID=ap-northeast-1_xxxxx
VITE_JOBSEEKER_COGNITO_CLIENT_ID=xxxxx
```

**infra/.env.{dev|stg|prod}**
```env
ALLOWED_ORIGINS=http://localhost:5173
CLOUDFRONT_DOMAIN=xxxxx.cloudfront.net     # stg/prod のみ
LOG_LEVEL=info
```

## 開発コマンド

```bash
# 開発
bun run dev               # client + server 同時起動
bun run dev:client        # client のみ
bun run dev:server        # server のみ

# ビルド
bun run build             # 全パッケージビルド
bun run build:client:dev  # client ビルド（dev 環境）

# テスト
bun run test              # 全テスト実行
bun run test:coverage     # カバレッジ付きテスト

# コード品質
bun run lint              # Biome リント
bun run format            # Biome フォーマット
bun run type-check        # TypeScript 型チェック

# Docker
bun run docker:up         # DynamoDB Local 起動
bun run docker:down       # DynamoDB Local 停止
bun run docker:logs       # ログ確認
```

## デプロイ

3 環境（dev / stg / prod）をサポート。CDK で AWS にデプロイする。

```bash
cd infra

# 差分確認
bun run diff:dev

# デプロイ（全スタック）
bun run deploy:dev

# フロントエンドのみデプロイ
bun run deploy:front:dev

# Cognito のみデプロイ
bun run deploy:cognito:dev

# 破棄
bun run destroy:dev
```

### ステージ別設定

| 設定 | dev | stg | prod |
|------|-----|-----|------|
| Lambda メモリ | 512 MB | 512 MB | 1024 MB |
| Lambda タイムアウト | 30s | 30s | 30s |
| リソース削除ポリシー | DESTROY | RETAIN | RETAIN |
| S3 自動削除 | 有効 | 無効 | 無効 |

## API エンドポイント

### 公開 API
- `GET /health` - ヘルスチェック
- `GET /jobs` - 求人一覧

### 求職者 API（要認証）
- `/users` - ユーザー情報
- `/photos` - 写真アップロード（Pre-Signed URL）
- `/applications` - 応募管理
- `/scouts` - スカウト管理

### 管理 API（要認証 + ロールベース認可）
- `/admin/tenants` - テナント管理
- `/admin/users` - ユーザー管理
- `/admin/jobs` - 求人管理
- `/admin/applicants` - 応募者管理
- `/admin/scouts` - スカウト管理

### AI API
- `POST /ai/keigo` - 敬語変換（別 Lambda）

## スクリプト

| スクリプト | 説明 |
|-----------|------|
| `scripts/setup-local-dynamodb.sh` | ローカル DynamoDB にテーブル作成 |
| `scripts/apply-security-settings.sh` | CloudFront・Lambda セキュリティ設定適用 |
| `scripts/seed-local-dynamodb.sh` | テストデータ投入 |
| `scripts/create-cognito-user.sh` | Cognito ユーザー作成 |
| `scripts/create-cognito-user-test.sh` | テスト用 Cognito ユーザー作成 |
| `scripts/register-existing-user-to-db.sh` | 既存 Cognito ユーザーを DB に登録 |
| `scripts/work.http` | API テスト用 HTTP リクエスト集 |

## ライセンス

MIT
- [AWS Amplify UI Liveness](https://ui.docs.amplify.aws/react/connected-components/liveness)
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Hono Framework](https://hono.dev/)
- [Bun Documentation](https://bun.sh/docs)

## 📞 サポート

問題や質問がある場合は、プロジェクトリポジトリのIssuesを確認してください。

