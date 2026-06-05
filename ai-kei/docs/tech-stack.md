# プロジェクト技術スタック定義

## 🔧 生成情報
- **生成日**: 2026-06-01
- **生成ツール**: init-tech-stack
- **プロジェクトタイプ**: Webアプリケーション
- **チーム規模**: 個人開発
- **開発期間**: プロトタイプ/MVP

## 🎯 プロジェクト要件サマリー
- **パフォーマンス**: 軽負荷
- **セキュリティ**: 基本レベル
- **技術スキル**: JavaScript/TypeScript, Python, React/Vue/Angular, クラウド(AWS/Azure/GCP)
- **学習コスト許容度**: バランス重視
- **デプロイ先**: ローカル環境のみ
- **予算**: コスト最小化

## 🚀 フロントエンド
- **フレームワーク**: React 18.3+
- **言語**: TypeScript 5.7+
- **ランタイム**: Bun 1.1+ (開発・本番)
- **バンドラー**: Vite 6
- **スタイリング**: Tailwind CSS 4.0+
- **状態管理**: React Hooks (useState, useContext等)
- **ルーティング**: 不要（単一ページアプリケーション）

### 選択理由
- requirements.mdで指定されているbhvr.dev（Bun Hot Vite React）に完全対応
- Bunは超高速なJavaScriptランタイム（パッケージインストールがnpmの25倍高速）
- Viteによる高速なHMR（Hot Module Replacement）で快適な開発体験
- Reactはチームの既存スキルを活用でき、学習コストが最小
- TypeScriptで型安全性を確保し、バグを早期発見
- Tailwind CSSで高速なUI開発が可能

## ⚙️ バックエンド
- **構成**: バックエンドレス（SPA構成）
- **API**: 不要（全てフロントエンドで完結）

### 選択理由
- BMI計算は単純な数式計算のみで、サーバー側処理が不要
- ローカル環境のみの要件に対して、サーバー不要で最適化
- コスト最小化の要件を完璧に満たす（サーバー費用ゼロ）
- デプロイ作業が不要で、開発に集中できる
- 個人開発に最適なシンプルな構成

## 💾 データベース設計
- **メインDB**: 不要
- **ローカルストレージ**: LocalStorage（計算履歴の保存に使用）
- **ファイルストレージ**: 不要

### 設計方針
- BMI計算結果は一時的なもので、永続化は必須ではない
- 必要に応じてLocalStorageで計算履歴を保存
- シンプルな key-value 形式で十分
- データ量が少ないため、パフォーマンス問題なし

## 🛠️ 開発環境
- **コンテナ**: 不要（ローカル環境のみ）
- **パッケージマネージャー**: Bun 1.1+ (超高速・Node.js互換)
- **ランタイムバージョン**: Bun 1.1+

### 開発ツール
- **テストフレームワーク**:
  - Vitest 2+ (Vite統合、超高速)
  - @testing-library/react (Reactコンポーネントテスト)
- **E2Eテスト**: Playwright 1.49+ (必要に応じて)
- **リンター・フォーマッター**:
  - Biome 1.9+ (ESLint + Prettier代替、超高速)
- **型チェック**:
  - TypeScript Compiler (tsc)

### CI/CD
- **CI/CD**: GitHub Actions (推奨、必要に応じて)
- **コード品質**: Biome (lint + format)
- **テスト**: Unit (Vitest), E2E (Playwright)
- **デプロイ**: 不要（ローカル環境のみ）

## ☁️ インフラ・デプロイ
- **フロントエンド**: ローカル環境（開発サーバー: Vite）
- **バックエンド**: 不要
- **データベース**: 不要
- **CDN**: 不要
- **本番環境**: `bun run build` で静的ファイル生成、ローカルで利用

## 🔒 セキュリティ
- **HTTPS**: ローカル環境のため不要
- **認証**: 不要（個人利用のみ）
- **CORS**: 不要（外部API呼び出しなし）
- **バリデーション**: フロントエンドでの入力バリデーション（身長・体重の妥当性チェック）
- **環境変数**: 不要（機密情報なし）
- **依存関係**: Bunの脆弱性チェック機能を活用

## 📊 品質基準
- **テストカバレッジ**: 70%以上（MVP段階）
- **コード品質**: Biome による自動チェック
- **型安全性**: TypeScript strict mode 有効
- **パフォーマンス**: 初回レンダリング 100ms以内
- **アクセシビリティ**: WAI-ARIA 基本対応（ラベル、キーボード操作）

## 📁 推奨ディレクトリ構造

```
./ (カレントディレクトリ = プロジェクトルート)
├── src/                      # ソースコード
│   ├── components/          # Reactコンポーネント
│   │   ├── BmiCalculator.tsx  # メインコンポーネント
│   │   ├── BmiResult.tsx      # 結果表示コンポーネント
│   │   ├── BmiInfo.tsx        # BMI解説コンポーネント
│   │   └── InputForm.tsx      # 入力フォームコンポーネント
│   ├── utils/               # ユーティリティ関数
│   │   ├── bmiCalculations.ts  # BMI計算ロジック
│   │   └── validation.ts       # バリデーションロジック
│   ├── types/               # TypeScript型定義
│   │   └── bmi.ts            # BMI関連の型定義
│   ├── hooks/               # カスタムフック
│   │   └── useLocalStorage.ts  # LocalStorage操作フック
│   ├── styles/              # グローバルスタイル
│   │   └── index.css         # Tailwind CSS インポート
│   ├── App.tsx              # ルートコンポーネント
│   └── main.tsx             # エントリポイント
├── public/                   # 静的ファイル
│   └── favicon.ico
├── tests/                    # テスト
│   ├── unit/                # ユニットテスト
│   │   ├── bmiCalculations.test.ts
│   │   └── validation.test.ts
│   └── e2e/                 # E2Eテスト（必要に応じて）
│       └── app.spec.ts
├── docs/                     # ドキュメント
│   ├── tech-stack.md        # このファイル
│   └── requirements.md      # 要件定義書
├── dist/                     # ビルド出力（.gitignore）
├── node_modules/            # 依存関係（.gitignore）
├── package.json             # パッケージ定義
├── bun.lockb                # Bunロックファイル
├── tsconfig.json            # TypeScript設定
├── vite.config.ts           # Vite設定
├── tailwind.config.js       # Tailwind CSS設定
├── biome.json               # Biome設定
├── .gitignore
└── README.md
```

**重要**: 上記の `./` はカレントディレクトリ（現在作業中のディレクトリ）を指します。新しいディレクトリを作成するのではなく、既存のプロジェクトルートに直接配置してください。

## 🚀 セットアップ手順

### 1. 開発環境準備
```bash
# Bunのインストール（macOS/Linux）
curl -fsSL https://bun.sh/install | bash

# プロジェクトのセットアップ
cd /path/to/project
bun install

# 開発サーバー起動
bun run dev
```

### 2. 主要コマンド
```bash
# 開発サーバー起動（Hot Reload有効）
bun run dev

# 本番ビルド
bun run build

# ビルド結果をプレビュー
bun run preview

# テスト実行
bun test

# Lint & Format
bun run lint
bun run format

# 型チェック
bun run type-check
```

## 🔍 bhvr.dev について

**bhvr.dev** は以下の技術スタックの総称です：

- **B**un: 超高速JavaScriptランタイム
  - パッケージインストールがnpmの25倍高速
  - Node.js互換性が高く、既存の知識を活用可能
  - TypeScript / JSX のネイティブサポート

- **H**ot: Hot Module Replacement (HMR)
  - ファイル保存時に即座にブラウザに反映
  - ページリロード不要で開発効率向上

- **V**ite: 次世代ビルドツール
  - 開発サーバー起動が超高速（数秒以内）
  - ESModuleベースで最適化されたバンドル

- **R**eact: UIライブラリ
  - コンポーネントベースの再利用可能な設計
  - 豊富なエコシステム

この組み合わせにより、開発時の起動速度とHMRが非常に高速になり、快適な開発体験が得られます。

## 📝 カスタマイズ方法

このファイルはプロジェクトの進行に応じて更新してください：

1. **技術の追加**: 新しいライブラリ・ツールを追加した場合は記載
2. **要件の変更**: パフォーマンス・セキュリティ要件の更新
3. **インフラの変更**: デプロイ先の変更（例: Netlify, Vercelへの公開）
4. **チーム変更**: メンバー増減に応じた技術選択の見直し

## 🔄 更新履歴
- 2026-06-01: 初回生成 (init-tech-stackにより自動生成)
