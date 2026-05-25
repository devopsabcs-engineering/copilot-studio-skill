# Promotes finalized PNGs from screenshots/final/lab-NN/*.png into images/lab-NN/*.png.
# Flat 1:1 copy preserving filenames — DD-03 keeps the locale suffix on the filename
# itself (e.g. lab-03-create-agent-landing.png for EN, lab-03-create-agent-landing-fr.png
# for FR), so there is no per-language subfolder.
#
# This is the ONLY script in the harness that writes into images/lab-NN/ for the
# Playwright-driven captures. capture-terminal.ps1 writes its own freeze renders
# directly into images/lab-NN/ since they are deterministic re-renders of committed
# text fixtures and need no promote step.
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path "$PSScriptRoot/../..").Path
$finalDir = Join-Path $repoRoot 'screenshots/final'
$imagesDir = Join-Path $repoRoot 'images'

if (-not (Test-Path $finalDir)) {
    Write-Host "No screenshots/final directory at $finalDir. Nothing to promote."
    return
}

$labDirs = Get-ChildItem -Path $finalDir -Directory -Filter 'lab-*' -ErrorAction SilentlyContinue
if ($null -eq $labDirs -or $labDirs.Count -eq 0) {
    Write-Host "No lab-* directories found in $finalDir. Nothing to promote."
    return
}

$totalCopied = 0
foreach ($labDir in $labDirs) {
    $targetDir = Join-Path $imagesDir $labDir.Name
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        Write-Host "Created $targetDir"
    }

    $pngs = Get-ChildItem -Path $labDir.FullName -Filter '*.png' -File -ErrorAction SilentlyContinue
    if ($null -eq $pngs -or $pngs.Count -eq 0) {
        Write-Host "No PNGs in $($labDir.FullName); skipping."
        continue
    }

    foreach ($png in $pngs) {
        $target = Join-Path $targetDir $png.Name
        Copy-Item -Path $png.FullName -Destination $target -Force
        Write-Host "Copied $($png.Name) → images/$($labDir.Name)/"
        $totalCopied++
    }
}

Write-Host "Done. Promoted $totalCopied file(s) into images/."
