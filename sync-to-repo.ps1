# Run this from inside your goaltify-p3 folder:
# cd C:\Users\fhard\Downloads\goaltify-p3
# .\sync-to-repo.ps1

$zip = "$env:USERPROFILE\Downloads\goaltify-main-updated.zip"
$tmp = "$env:TEMP\goaltify-sync"

Write-Host "Extracting zip..." -ForegroundColor Cyan
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
Expand-Archive -Path $zip -DestinationPath $tmp
$src = "$tmp\goaltify-main"

# Files to copy (relative to repo root)
$files = @(
  "lib\competitions.ts",
  "app\globals.css",
  "app\sitemap.ts",
  "package.json",
  "postcss.config.js",
  "components\competitions\CompetitionLayout.tsx",
  "components\teams\TeamLayout.tsx",
  # Team pages - premier-league
  "app\competitions\premier-league\teams\[team]\page.tsx",
  "app\competitions\premier-league\teams\[team]\news\page.tsx",
  "app\competitions\premier-league\teams\[team]\matches\page.tsx",
  "app\competitions\premier-league\teams\[team]\standings\page.tsx",
  "app\competitions\premier-league\teams\[team]\top-players\page.tsx",
  # Team pages - la-liga
  "app\competitions\la-liga\teams\[team]\page.tsx",
  "app\competitions\la-liga\teams\[team]\news\page.tsx",
  "app\competitions\la-liga\teams\[team]\matches\page.tsx",
  "app\competitions\la-liga\teams\[team]\standings\page.tsx",
  "app\competitions\la-liga\teams\[team]\top-players\page.tsx",
  # Team pages - bundesliga
  "app\competitions\bundesliga\teams\[team]\page.tsx",
  "app\competitions\bundesliga\teams\[team]\news\page.tsx",
  "app\competitions\bundesliga\teams\[team]\matches\page.tsx",
  "app\competitions\bundesliga\teams\[team]\standings\page.tsx",
  "app\competitions\bundesliga\teams\[team]\top-players\page.tsx",
  # Team pages - serie-a
  "app\competitions\serie-a\teams\[team]\page.tsx",
  "app\competitions\serie-a\teams\[team]\news\page.tsx",
  "app\competitions\serie-a\teams\[team]\matches\page.tsx",
  "app\competitions\serie-a\teams\[team]\standings\page.tsx",
  "app\competitions\serie-a\teams\[team]\top-players\page.tsx",
  # Team pages - ligue-1
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
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Write-Host "  Created dir: $dir" -ForegroundColor Gray
  }
  Copy-Item -Path $source -Destination $dest -Force
  Write-Host "  Copied: $f" -ForegroundColor Green
}

# Remove the old [competition] dynamic route if it exists
$oldRoute = "app\competitions\[competition]"
if (Test-Path $oldRoute) {
  Remove-Item $oldRoute -Recurse -Force
  Write-Host "  Removed old dynamic route: $oldRoute" -ForegroundColor Yellow
}

# Remove tailwind.config.ts if it still exists
if (Test-Path "tailwind.config.ts") {
  Remove-Item "tailwind.config.ts" -Force
  Write-Host "  Removed tailwind.config.ts" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done! Now run:" -ForegroundColor Cyan
Write-Host "  git add -A" -ForegroundColor White
Write-Host "  git commit -m `"fix: add team data exports and team pages`"" -ForegroundColor White
Write-Host "  git push" -ForegroundColor White
