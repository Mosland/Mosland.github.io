# Genera assets/og-image-v2.png a partir de tools/og-image.html.
#
# Uso:  powershell -ExecutionPolicy Bypass -File tools\build-og.ps1
#
# Rasteriza con Edge headless, que ya viene con Windows: no hace falta Node,
# ImageMagick ni Pillow. Hay que volver a correrlo cada vez que se toque
# og-image.html.
#
# Si se cambia el diseño de la imagen, conviene renombrar el archivo de salida
# (og-image-v3.png, etc.) y actualizar la meta og:image de index.html: WhatsApp
# y Facebook cachean la imagen scrapeada por mucho tiempo y, si se pisa el mismo
# nombre, siguen mostrando la vieja.

$ErrorActionPreference = 'Stop'

$root   = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root 'tools\og-image.html'
$out    = Join-Path $root 'assets\og-image-v3.png'

$edge = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $edge) { throw "No se encontró msedge.exe. Instalá Microsoft Edge o ajustá la ruta." }
if (-not (Test-Path $source)) { throw "No se encontró $source" }

# --user-data-dir es obligatorio: sin un perfil propio el screenshot falla en
# silencio (sale con código 0 y no escribe el archivo). La carpeta tiene que
# existir de antes: si Edge la tiene que crear él, también falla.
$profile = Join-Path $env:TEMP "og-build-$(Get-Random)"
New-Item -ItemType Directory -Force -Path $profile | Out-Null

try {
  & $edge --headless=new --disable-gpu --no-sandbox --hide-scrollbars `
          --force-device-scale-factor=1 `
          --user-data-dir="$profile" `
          --screenshot="$out" --window-size=1200,630 `
          ("file:///" + ($source -replace '\\','/'))

  # Edge devuelve el control antes de terminar de escribir el PNG, así que un
  # Test-Path inmediato falla aunque el screenshot haya salido bien. Se espera
  # hasta 10 segundos a que el archivo aparezca.
  $limite = (Get-Date).AddSeconds(10)
  while (-not (Test-Path $out) -and (Get-Date) -lt $limite) { Start-Sleep -Milliseconds 250 }

  if (-not (Test-Path $out)) { throw "Edge no escribió $out" }

  Add-Type -AssemblyName System.Drawing
  $img = [System.Drawing.Image]::FromFile($out)
  $dim = "$($img.Width)x$($img.Height)"
  $img.Dispose()

  $kb = [math]::Round((Get-Item $out).Length / 1KB, 1)
  Write-Host "OK  $out  $dim  ${kb}KB"
  if ($kb -gt 300) { Write-Warning "Pasa los 300KB: WhatsApp puede no levantarla." }
}
finally {
  Remove-Item $profile -Recurse -Force -ErrorAction SilentlyContinue
}
