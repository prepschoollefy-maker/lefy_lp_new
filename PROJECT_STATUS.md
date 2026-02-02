# LEFY LP プロジェクト状態

## 🚧 現在進行中の作業

### 中高一貫校・大学受験向けページ（作成中）

**ページ:** `/about-ikkan`（`app/about-ikkan/page.tsx`）

**状況:**
- スケルトン版を作成済み（工事中表示）
- 環境変数 `NEXT_PUBLIC_SHOW_IKKAN_PAGE` で表示制御
- **本番（intro.lefy.jp）**: 非表示
- **ローカル（localhost:3000）**: 表示される

**完成時の対応:**
1. ページコンテンツを完成させる
2. Vercelの環境変数に `NEXT_PUBLIC_SHOW_IKKAN_PAGE=true` を追加
3. 再デプロイで本番公開

**関連ファイル:**
- `app/about-ikkan/page.tsx` - 中高一貫校向けページ
- `app/page.tsx` - トップページ（条件付きリンク表示）
- `components/lefy/page-card.tsx` - ラベル機能追加済み
- `.env.local` - ローカル環境変数

---

## ページ構造

| ページ | パス | 対象 | 状態 |
|--------|------|------|------|
| LEFYってどんな塾？（中学受験） | `/about` | 中学受験生 | ✅ 公開中 |
| LEFYってどんな塾？（中高一貫） | `/about-ikkan` | 中高一貫校生 | 🚧 開発中 |
| 授業料／システム | `/pricing` | 全員 | ✅ 公開中 |
| 体験授業申込 | `/trial-lesson` | 全員 | ✅ 公開中 |
| 学習相談申込 | `/counseling` | 全員 | ✅ 公開中 |

---

## デプロイ方法

`/deploy` ワークフローを参照、または:

```bash
npx vercel --prod
```

---

## 注意事項

- `.gitignore` にサービスアカウントのJSONキーを追加済み（`lefy-lp-*.json`）
- 機密情報は `.env.local` に保存（gitに含まれない）
