# 🚀 デプロイ方法

## ⚠️ 重要な注意事項

**このプロジェクトは `git push` が使えません！**

GitHubリモートがpushを拒否するため、**Vercel CLIを使用してデプロイ**してください。

---

## 📝 標準デプロイフロー

### ステップ1: コードを変更
通常通りにコードを編集します。

### ステップ2: ローカルでテスト
```bash
npm run dev
```
→ http://localhost:3000 で動作確認

### ステップ3: ビルド確認
```bash
npm run build
```
→ エラーがないことを確認

### ステップ4: Gitにコミット（ローカルのみ）
```bash
git add .
git commit -m "変更内容の説明"
```

⚠️ **`git push` はしないでください** - 失敗します

### ステップ5: Vercelにデプロイ 🎯
```bash
npx vercel --prod
```

これで完了！

---

## 🌐 デプロイURL

- **本番サイト**: https://intro.lefy.jp
- **Vercel URL**: https://lefy-l5qfdk9zl-lefy-kojis-projects.vercel.app

---

## 🔧 トラブルシューティング

### Q: git pushを試したら失敗した
**A**: 正常です。このプロジェクトではgit pushは使用しません。`npx vercel --prod` を使用してください。

### Q: Vercel CLIが見つからない
**A**: `npx` を使えば自動的にダウンロードされます。インストール不要です。

### Q: 環境変数はどこで設定する？
**A**: Vercelのダッシュボード（https://vercel.com）で設定します。必要な環境変数：
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `TRIAL_LESSON_SHEET_ID`
- `COUNSELING_SHEET_ID`

---

## 📚 参考情報

- Vercel CLI ドキュメント: https://vercel.com/docs/cli
- このプロジェクトのVercelダッシュボード: https://vercel.com/lefy-kojis-projects/lefy-lp

---

**最終更新**: 2026-01-31
