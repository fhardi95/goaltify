# Run from inside your goaltify-p3 folder:
# cd C:\Users\fhard\Downloads\goaltify-p3
# .\sync-to-repo.ps1

$zip = "$env:USERPROFILE\Downloads\goaltify-main-updated.zip"
$tmp = "$env:TEMP\goaltify-sync"

Write-Host "Extracting zip..." -ForegroundColor Cyan
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
Expand-Archive -Path $zip -DestinationPath $tmp
$src = "$tmp\goaltify-main"

$files = @(
  "lib\competitions.ts",
  "app\globals.css",
  "app\sitemap.ts",
  "package.json",
  "postcss.config.js",
  "components\competitions\CompetitionLayout.tsx",
  "components\teams\TeamLayout.tsx",
  "components\teams\TeamOverviewPage.tsx",
  "components\teams\TeamMatchesPage.tsx",
  "components\teams\TeamStandingsPage.tsx",
  "components\teams\TeamTopPlayersPage.tsx",
  "components\teams\TeamNewsPage.tsx",
  "app\competitions\premier-league\teams\[team]\page.tsx",
  "app\competitions\premier-league\teams\[team]\news\page.tsx",
  "app\competitions\premier-league\teams\[team]\matches\page.tsx",
  "app\competitions\premier-league\teams\[team]\standings\page.tsx",
  "app\competitions\premier-league\teams\[team]\top-players\page.tsx",
  "app\competitions\la-liga\teams\[team]\page.tsx",
  "app\competitions\la-liga\teams\[team]\news\page.tsx",
  "app\competitions\la-liga\teams\[team]\matches\page.tsx",
  "app\competitions\la-liga\teams\[team]\standings\page.tsx",
  "app\competitions\la-liga\teams\[team]\top-players\page.tsx",
  "app\competitions\bundesliga\teams\[team]\page.tsx",
  "app\competitions\bundesliga\teams\[team]\news\page.tsx",
  "app\competitions\bundesliga\teams\[team]\matches\page.tsx",
  "app\competitions\bundesliga\teams\[team]\standings\page.tsx",
  "app\competitions\bundesliga\teams\[team]\top-players\page.tsx",
  "app\competitions\serie-a\teams\[team]\page.tsx",
  "app\competitions\serie-a\teams\[team]\news\page.tsx",
  "app\competitions\serie-a\teams\[team]\matches\page.tsx",
  "app\competitions\serie-a\teams\[team]\standings\page.tsx",
  "app\competitions\serie-a\teams\[team]\top-players\page.tsx",
  "app\competitions\ligue-1\teams\[team]\page.tsx",
  "app\competitions\ligue-1\teams\[team]\news\page.tsx",
  "app\competitions\ligue-1\teams\[team]\matches\page.tsx",
  "app\competitions\ligue-1\teams\[team]\standings\page.tsx",
  "app\competitions\ligue-1\teams\[team]\top-players\page.tsx"
)

foreach ($f in $files) {
  $dest = ".\$f"
  $source = "$src\$f"
  $dir = Split-Path $dest -Parent
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  if (Test-Path $source) {
    Copy-Item -Path $source -Destination $dest -Force
    Write-Host "  OK: $f" -ForegroundColor Green
  } else {
    Write-Host "  MISSING: $f" -ForegroundColor Red
  }
}

if (Test-Path "app\competitions\[competition]") {
  Remove-Item "app\competitions\[competition]" -Recurse -Force
  Write-Host "  Removed old [competition] route" -ForegroundColor Yellow
}
if (Test-Path "tailwind.config.ts") {
  Remove-Item "tailwind.config.ts" -Force
  Write-Host "  Removed tailwind.config.ts" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done! Run:" -ForegroundColor Cyan
Write-Host "  git add -A" -ForegroundColor White
Write-Host "  git commit -m ""fix: team pages with shared components""" -ForegroundColor White
Write-Host "  git push" -ForegroundColor White
