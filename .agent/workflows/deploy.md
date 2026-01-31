---
description: デプロイ方法（Vercel CLI使用）
---

# デプロイ手順

⚠️ **重要**: このプロジェクトでは `git push` が失敗します。代わりにVercel CLIを使用してください。

## 理由
GitHubリモートがpushを拒否するため（ブランチ保護ルールまたは認証の問題）、Vercel CLIで直接デプロイします。

## デプロイフロー

### 1. コードを変更・テスト
```bash
npm run dev
# http://localhost:3000 で動作確認
```

### 2. ビルドテスト
// turbo
```bash
npm run build
```

### 3. ローカルにコミット
// turbo
```bash
git add .
git commit -m "変更内容の説明"
```

⚠️ **git push はしない** - 失敗します

### 4. Vercelにデプロイ
```bash
npx vercel --prod
```

**デプロイURL:**
- 本番: https://intro.lefy.jp
- Vercel: https://lefy-l5qfdk9zl-lefy-kojis-projects.vercel.app

## 注意事項
- `git push origin main` は使用しないでください（失敗します）
- ローカルのコミット履歴は維持されます
- Vercel CLIが唯一の信頼できるデプロイ方法です
