# KOKOLTH (ココルス)

**LINEによるオンライン相談サービス**

KOKOLTHは、LINEメッセージングを通じて匿名オンライン相談サービスを提供するNext.jsベースのWebアプリケーションです。本プラットフォームでは、ユーザーが専門的なメンタルヘルスサポートと人生相談を受けることができます。

## 🌟 プロジェクト概要

- **ドメイン**: [www.kokolth.com](https://www.kokolth.com)
- **本番サイト**: [ココロス](https://kokolth-topgun0415s-projects.vercel.app/)
- **バージョン**: 0.1.0v 
- **リリース日**: 2025/07/27

## ✨ 主要機能

- **LINE連携**: LINEビジネスアカウントを通じた相談サービス
- **匿名相談**: プライバシーを重視した相談システム
- **決済システム**: Stripe決済処理の統合
- **管理者ダッシュボード**: 管理者向けコンテンツ管理システム
- **ユーザー認証**: Supabaseによる安全なログイン・サインアップ
- **ニュース・ブログ**: 更新情報と記事のコンテンツ管理
- **レスポンシブデザイン**: Tailwind CSSによるモバイルファーストのレスポンシブデザイン

## 🏗 技術アーキテクチャ

### フロントエンド
- **フレームワーク**: Next.js 15.2.1 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIコンポーネント**: カスタムアトミックデザインコンポーネント
- **アニメーション**: Framer Motion
- **リッチテキストエディター**: TipTap

### バックエンド・データベース
- **データベース**: Supabase (PostgreSQL)
- **認証**: Next-Auth with Supabase
- **決済処理**: Stripe

### デプロイ・インフラストラクチャ
- **ホスティング**: Vercel
- **コンテナ化**: Docker
- **CI/CD**: GitHub Actions

## 📁 プロジェクト構造

```
kokolth/
├── my-app/                    # メインNext.jsアプリケーション
│   ├── src/
│   │   ├── app/              # App Routerページ
│   │   │   ├── (routes)/     # ルートグループ
│   │   │   │   ├── admin/    # 管理者ダッシュボード
│   │   │   │   ├── auth/     # 認証
│   │   │   │   ├── payment/  # 決済処理
│   │   │   │   └── ...
│   │   │   └── api/          # APIルート
│   │   ├── components/       # UIコンポーネント (アトミックデザイン)
│   │   │   ├── atoms/        # 基本UI要素
│   │   │   ├── molecules/    # 複合基本要素
│   │   │   ├── organisms/    # 複雑なUIコンポーネント
│   │   │   └── sections/     # ページセクション
│   │   ├── lib/             # ユーティリティライブラリ
│   │   ├── providers/       # コンテキストプロバイダー
│   │   └── store/           # 状態管理 (Zustand)
│   ├── public/              # 静的アセット
│   └── package.json
└── README.md
```

## 📋 現在の状況とロードマップ

### ✅ 実装済み機能
- 複数セクションを持つレスポンシブWebサイト
- Stripe決済統合
- コンテンツ管理用管理者ダッシュボード
- ユーザー認証システム
- 投稿・ニュース管理
- LINE連携セットアップ

### 🚧 開発中
- LINE通知システム
- リアルタイムチャット機能
- 決済機能の拡張
- 高度な管理者機能

## 🛠 技術スタック

[![TypeScript](https://skillicons.dev/icons?i=ts)](https://www.typescriptlang.org/)
[![Next.js](https://skillicons.dev/icons?i=next)](https://nextjs.org/)
[![React](https://skillicons.dev/icons?i=react)](https://reactjs.org/)
[![Tailwind CSS](https://skillicons.dev/icons?i=tailwind)](https://tailwindcss.com/)
[![Supabase](https://skillicons.dev/icons?i=supabase)](https://supabase.com/)
[![PostgreSQL](https://skillicons.dev/icons?i=postgresql)](https://www.postgresql.org/)
[![Docker](https://skillicons.dev/icons?i=docker)](https://www.docker.com/)
[![Vercel](https://skillicons.dev/icons?i=vercel)](https://vercel.com/)

## 📄 ライセンス

このプロジェクトはKOKOLTHの私有かつ専有です。

---

© 2025 KOKOLTH - オンライン相談サービス
