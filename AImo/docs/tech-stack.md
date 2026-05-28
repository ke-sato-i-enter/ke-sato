# プロジェクト技術スタック定義

## 🔧 生成情報
- **生成日**: 2026-05-22
- **生成ツール**: init-tech-stack
- **プロジェクトタイプ**: フルスタック
- **チーム規模**: 小規模チーム
- **開発期間**: プロトタイプ/MVP

## 🎯 プロジェクト要件サマリー
- **パフォーマンス**: 軽負荷（同時利用者数10人以下、レスポンスは考慮しない）
- **セキュリティ**: 基本レベル（一般的なWebセキュリティ対策）
- **技術スキル**: 技術スキル限定的（学習しながら進めたい）
- **学習コスト許容度**: 既存スキル活用（チームの知識を最大限活用）
- **デプロイ先**: クラウド（AWS）
- **予算**: コスト最小化（無料・低コストツール優先）

## 🚀 フロントエンド
- **フレームワーク**: Next.js 15
- **言語**: TypeScript 5.7+
- **状態管理**: React Context API / Zustand（必要に応じて）
- **UI ライブラリ**: Tailwind CSS 4
- **バンドラー**: Turbopack（Next.js 組み込み）
- **ルーティング**: Next.js App Router

### 選択理由
- **フルスタックフレームワークで学習コストが低い**: フロントエンドとバックエンドを統一的に開発でき、API Routes で簡単にバックエンド機能を実装可能
- **豊富なドキュメントとコミュニティ**: 初心者でも学習しやすく、問題解決が容易
- **無料ホスティング対応**: Vercel 等の無料枠でデプロイ可能、コスト最小化を実現
- **TypeScript で型安全性を確保**: 小規模チームでもコード品質を維持しやすい
- **高速なビルドと開発体験**: Turbopack による高速なホットリロード

## ⚙️ バックエンド
- **フレームワーク**: Next.js 15 API Routes + Express 5（必要に応じて独立サーバー）
- **言語**: TypeScript 5.7+
- **ランタイム**: Node.js 22 LTS
- **データベース**: SQLite 3.47+（開発・MVP）→ PostgreSQL 17+（本番移行時）
- **ORM**: Prisma 6+（型安全なデータベースアクセス）
- **認証**: NextAuth.js v5（OAuth、JWT、セッション管理）
- **バリデーション**: Zod 3+（スキーマバリデーション）

### 選択理由
- **フロントエンドと言語統一で学習コスト削減**: JavaScript/TypeScript のみで開発完結
- **Next.js API Routes でシンプル開始**: 小規模なAPIは Next.js 内で実装、必要に応じて Express に拡張可能
- **軽負荷に十分な性能**: Node.js は軽負荷アプリケーションに最適
- **豊富なライブラリとエコシステム**: npm エコシステムで必要な機能を素早く追加可能
- **Prisma で型安全なDB操作**: TypeScript との統合が優れ、マイグレーション管理も容易

## 💾 データベース設計
- **開発・MVP**: SQLite 3.47+（ファイルベース、設定不要）
- **本番移行時**: PostgreSQL 17+（マネージドサービス推奨）
- **キャッシュ**: 必要に応じて Redis 7.4+（本番環境でのパフォーマンス最適化時）
- **ファイルストレージ**: Cloudflare R2 / AWS S3（無料枠活用）

### 設計方針
- **段階的移行戦略**: SQLite で素早く開発開始、スケール時に PostgreSQL へ移行（Prisma が移行をサポート）
- **無料マネージドサービス活用**: Supabase、Neon、PlanetScale 等の無料枠でコスト最小化
- **シンプルなスキーマ設計**: MVP では最小限のテーブル構成、必要に応じて拡張
- **データバックアップ**: マネージドサービスの自動バックアップ機能を活用

## 🛠️ 開発環境
- **コンテナ**: Docker 27+ + Docker Compose v2
- **パッケージマネージャー**: pnpm 9+（高速・ディスク効率）
- **Node.js バージョン**: 22 LTS
- **TypeScript バージョン**: 5.7+

### 開発ツール
- **テストフレームワーク**:
  - ユニット・統合テスト: Vitest 2+
  - コンポーネントテスト: Testing Library（React Testing Library）
  - E2Eテスト: Playwright 1.49+（全ブラウザ対応・高速・信頼性高）
- **リンター・フォーマッター**:
  - Biome 1.9+（最速オールインワン：リント、フォーマット、インポート整理）
  - 代替: ESLint 9+ + Prettier 3+
- **型チェック**: TypeScript Compiler（tsc）
- **Git Hooks**: Husky + lint-staged（コミット前の自動チェック）

### CI/CD
- **CI/CD**: GitHub Actions（無料枠活用）
- **コード品質チェック**:
  - Biome によるリント・フォーマットチェック
  - TypeScript 型チェック
  - 自動テスト実行（Unit + Integration + E2E）
- **デプロイ**: 
  - Vercel（Next.js 最適化、無料枠）
  - 代替: Netlify、Cloudflare Pages

## ☁️ インフラ・デプロイ
- **フロントエンド**: Vercel（Next.js 専用ホスティング、無料枠）
- **バックエンド**: Vercel Serverless Functions（Next.js API Routes）
- **データベース**: 
  - 開発: SQLite（ローカル）
  - 本番: Supabase / Neon（PostgreSQL マネージド、無料枠）
- **ファイルストレージ**: Cloudflare R2（S3 互換、無料枠10GB）
- **CDN**: Vercel Edge Network（自動）
- **監視・ログ**: Vercel Analytics（無料枠）

### コスト最適化戦略
- **無料枠を最大限活用**: 各サービスの無料枠内で運用（Vercel、Supabase、Cloudflare）
- **サーバーレスアーキテクチャ**: 従量課金で使った分だけ支払い、アイドル時はコストゼロ
- **段階的スケール**: 必要に応じて有料プランへアップグレード

## 🔒 セキュリティ
- **HTTPS**: 必須（Vercel が自動で Let's Encrypt 証明書を提供）
- **認証**: NextAuth.js v5（OAuth、JWT、セッション管理）
- **CORS**: Next.js の API Routes で適切に設定
- **バリデーション**: Zod によるサーバーサイドバリデーション
- **環境変数**: `.env.local` で管理、Vercel 環境変数に機密情報を保存
- **依存関係**: 
  - Dependabot による自動脆弱性チェック
  - 定期的な `pnpm audit` 実行
- **セキュリティヘッダー**: Next.js の `next.config.js` で設定

## 📊 品質基準
- **テストカバレッジ**: 70%以上（MVP段階）、80%以上（本番移行時）
- **コード品質**: Biome によるリント・フォーマット統一
- **型安全性**: TypeScript strict モード有効、`any` 型の使用を最小限に
- **パフォーマンス**: 
  - Lighthouse スコア 90+点
  - Core Web Vitals 合格（LCP < 2.5s、FID < 100ms、CLS < 0.1）
- **アクセシビリティ**: WCAG 2.1 AA準拠を目指す

## 📁 推奨ディレクトリ構造

```
./ (カレントディレクトリ = プロジェクトルート)
├── app/                      # Next.js App Router
│   ├── (auth)/              # 認証関連ルート
│   ├── api/                 # API Routes
│   │   └── v1/
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # ホームページ
│   └── globals.css          # グローバルスタイル
├── components/              # 再利用可能なコンポーネント
│   ├── ui/                  # UIコンポーネント
│   └── features/            # 機能別コンポーネント
├── lib/                     # ユーティリティ・ヘルパー
│   ├── db.ts               # Prisma クライアント
│   ├── auth.ts             # NextAuth 設定
│   └── utils.ts            # 汎用関数
├── prisma/                  # Prisma ORM
│   ├── schema.prisma       # データベーススキーマ
│   ├── migrations/         # マイグレーションファイル
│   └── seed.ts             # シードデータ
├── public/                  # 静的ファイル
├── types/                   # TypeScript 型定義
├── tests/                   # テスト
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docker-compose.yml       # Docker構成（開発環境）
├── .github/
│   └── workflows/          # GitHub Actions
│       ├── ci.yml
│       └── deploy.yml
├── docs/                    # ドキュメント
│   ├── tech-stack.md       # このファイル
│   ├── requirements/       # 要件定義書
│   ├── design/             # 設計書
│   └── tasks/              # タスク管理
├── .env.example            # 環境変数テンプレート
├── .env.local              # ローカル環境変数（gitignore）
├── .gitignore
├── biome.json              # Biome 設定
├── next.config.js          # Next.js 設定
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json           # TypeScript 設定
├── playwright.config.ts    # Playwright 設定
├── vitest.config.ts        # Vitest 設定
└── README.md
```

**重要**: 上記の `./` はカレントディレクトリ（現在作業中のディレクトリ）を指します。新しいディレクトリを作成するのではなく、既存のプロジェクトルートに直接配置してください。

## 🚀 セットアップ手順

### 1. 開発環境準備

#### Node.js と pnpm のインストール
```bash
# Node.js 22 LTS をインストール（nvm 使用推奨）
nvm install 22
nvm use 22

# pnpm をインストール
npm install -g pnpm@latest
```

#### プロジェクトの初期化
```bash
# Next.js プロジェクトを作成
npx create-next-app@latest . --typescript --tailwind --app --use-pnpm

# 依存関係をインストール
pnpm install

# Prisma をセットアップ
pnpm add -D prisma
pnpm add @prisma/client
npx prisma init --datasource-provider sqlite

# 開発ツールをインストール
pnpm add -D @biomejs/biome vitest @testing-library/react @testing-library/jest-dom @playwright/test
pnpm add zod next-auth@beta
```

### 2. 主要コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番環境でプレビュー
pnpm start

# リント・フォーマット
pnpm biome check --write .

# 型チェック
pnpm tsc --noEmit

# テスト実行
pnpm vitest                    # ユニットテスト
pnpm playwright test          # E2Eテスト

# データベースマイグレーション
npx prisma migrate dev         # 開発環境
npx prisma migrate deploy      # 本番環境
npx prisma studio              # GUI でデータベース確認
```

### 3. 環境変数設定

`.env.local` を作成（`.env.example` をコピー）：
```bash
# データベース
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth プロバイダー（必要に応じて）
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 📝 カスタマイズ方法

このファイルはプロジェクトの進行に応じて更新してください：

1. **技術の追加**: 新しいライブラリ・ツールを追加した際は、このファイルに記載
2. **要件の変更**: パフォーマンス・セキュリティ要件が変わったら更新
3. **インフラの変更**: デプロイ先・スケール要件の変更時に反映
4. **チーム変更**: メンバー増減に応じた技術選択の見直し

## 🔄 更新履歴
- 2026-05-22: 初回生成（init-tech-stack により自動生成）
  - フルスタックMVP向けの技術スタックを定義
  - Next.js + TypeScript + Prisma + SQLite/PostgreSQL
  - コスト最小化戦略（無料枠活用）
