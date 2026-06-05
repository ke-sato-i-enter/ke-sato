# BMI Calculator

bhvr.dev (Bun + Vite + React + TypeScript) ベースの BMI 計算アプリです。

## 必須環境

- Bun 1.1+

## セットアップ

```bash
bun install
```

## 開発コマンド

```bash
bun run dev
bun run build
bun run preview
bun run test
bun run type-check
bun run lint
bun run format
```

## ブラウザで成果物を確認する手順

### 1. 依存関係をインストール

```bash
bun install
```

この環境で `bun` が使えない場合は、以下で代替できます。

```bash
npm install
```

### 2. 開発サーバーを起動して確認（推奨）

```bash
bun run dev
```

`bun` がない場合:

```bash
npm run dev
```

起動後、ターミナルに表示される URL（通常は `http://localhost:5173`）をブラウザで開いて動作確認します。

### 3. 本番ビルド結果を確認（任意）

```bash
bun run build
bun run preview
```

`bun` がない場合:

```bash
npm run build
npm run preview
```

`preview` 起動後、表示された URL（通常は `http://localhost:4173`）をブラウザで開くと、本番ビルド相当の画面を確認できます。

## 現在の実装状況

- TASK-0001: 開発基盤セットアップを完了
- TASK-0002 以降で BMI 計算機能を実装
