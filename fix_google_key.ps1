# サービスアカウントJSONから秘密鍵を抽出し、実際の改行に変換してクリップボードにコピー
$jsonPath = "lefy-lp-f519b691d0a6.json"

if (-not (Test-Path $jsonPath)) {
    Write-Error "エラー: $jsonPath が見つかりません"
    exit 1
}

$json = Get-Content $jsonPath -Raw | ConvertFrom-Json
$privateKey = $json.private_key

# クリップボードにコピー
$privateKey | Set-Clipboard

Write-Host "✅ 秘密鍵をクリップボードにコピーしました。" -ForegroundColor Green
Write-Host ""
Write-Host "次のステップ:" -ForegroundColor Yellow
Write-Host "1. Vercel Dashboard を開く: https://vercel.com/lefy-kojis-projects/lefy_lp/settings/environment-variables"
Write-Host "2. 既存の GOOGLE_PRIVATE_KEY を削除"
Write-Host "3. 新しく GOOGLE_PRIVATE_KEY を作成"
Write-Host "4. Value欄で Ctrl+V で貼り付け（複数行のPEM形式になります）"
Write-Host "5. Production, Preview, Development すべてにチェック"
Write-Host "6. 保存"
Write-Host "7. Deployments タブから Redeploy（ビルドキャッシュなしで）"
Write-Host ""
Write-Host "確認用（最初の70文字）:" -ForegroundColor Cyan
Write-Host $privateKey.Substring(0, 70)
