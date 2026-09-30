# ==============================================================================
# SCRIPT DE BUILD E ANONIMIZAÇÃO — PORTFÓLIO LUCAS LIMA
# Gera a distribuição de produção (/dist) minificada, sem comentários de desenvolvimento
# e com código protegido e higienizado para o DevTools dos navegadores.
# ==============================================================================

$ErrorActionPreference = "Stop"

$workspaceRoot = $PSScriptRoot
$distDir = Join-Path $workspaceRoot "dist"
$assetsSource = Join-Path $workspaceRoot "assets"
$assetsDest = Join-Path $distDir "assets"

Write-Host "Iniciando processo de build e anonimizacao..." -ForegroundColor Cyan

# 1. Cria ou limpa o diretorio dist
if (Test-Path $distDir) {
    Remove-Item $distDir -Recurse -Force
}
New-Item -ItemType Directory -Path $distDir -Force | Out-Null
New-Item -ItemType Directory -Path $assetsDest -Force | Out-Null

# 2. Copia assets estáticos limpos (filtrando backups e arquivos ocultos do SO)
if (Test-Path $assetsSource) {
    Get-ChildItem -Path $assetsSource -File | Where-Object {
        $_.Name -notmatch '\.(old|bak|tmp)$' -and
        $_.Name -ne '.DS_Store' -and
        $_.Name -ne 'Thumbs.db'
    } | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $assetsDest -Force
    }
    Write-Host "[OK] Assets essenciais copiados para /dist/assets" -ForegroundColor Green
}

# 3. Copia o currículo oficial único (curriculo.pdf)
$cvSource = Join-Path $workspaceRoot "curriculo.pdf"
if (Test-Path $cvSource) {
    Copy-Item -Path $cvSource -Destination $distDir -Force
    Write-Host "[OK] curriculo.pdf (versão atualizada) copiado para /dist" -ForegroundColor Green
}

# 4. Anonimiza e minifica CSS (remove comentários de bloco e comprime espaços)
$cssPath = Join-Path $workspaceRoot "style.css"
$cssContent = Get-Content -Path $cssPath -Raw -Encoding UTF8

# Remove comentários CSS /* ... */
$cleanCss = [regex]::Replace($cssContent, "(?s)/\*.*?\*/", "")
# Reduz espaços múltiplos e quebras de linha
$cleanCss = [regex]::Replace($cleanCss, "\s+", " ")
$cleanCss = [regex]::Replace($cleanCss, "\s*([\{\}\:;,])\s*", '$1')
$cleanCss = $cleanCss.Trim()

# Banner limpo de producao
$cssHeader = "/* Lucas Lima - Portfolio | Build Anonimizado */"
Set-Content -Path (Join-Path $distDir "style.css") -Value "$cssHeader`n$cleanCss" -Encoding UTF8
Write-Host "[OK] style.css anonimizado e minificado gerado em /dist/style.css" -ForegroundColor Green

# 5. Anonimiza e minifica JavaScript (remove comentários e comprime espaços)
$jsPath = Join-Path $workspaceRoot "script.js"
$jsContent = Get-Content -Path $jsPath -Raw -Encoding UTF8

# Remove comentários JS /* ... */ e // ...
$cleanJs = [regex]::Replace($jsContent, "(?s)/\*.*?\*/", "")
$cleanJs = [regex]::Replace($cleanJs, "(?m)^\s*//.*?$", "")
# Reduz múltiplos espaços preservando quebras mínimas
$cleanJs = [regex]::Replace($cleanJs, "[ \t]+", " ")
$cleanJs = [regex]::Replace($cleanJs, "\r?\n\s*\r?\n", "`n")
$cleanJs = $cleanJs.Trim()

$jsHeader = "/* Lucas Lima - Portfolio | Script Anonimizado */"
Set-Content -Path (Join-Path $distDir "script.js") -Value "$jsHeader`n$cleanJs" -Encoding UTF8
Write-Host "[OK] script.js anonimizado gerado em /dist/script.js" -ForegroundColor Green

# 6. Anonimiza e minifica HTML (remove comentários HTML <!-- ... -->)
$htmlPath = Join-Path $workspaceRoot "index.html"
$htmlContent = Get-Content -Path $htmlPath -Raw -Encoding UTF8

# Remove comentários HTML <!-- ... -->
$cleanHtml = [regex]::Replace($htmlContent, "(?s)<!--.*?-->", "")
# Reduz múltiplos espaços em branco sem quebrar tags
$cleanHtml = [regex]::Replace($cleanHtml, "[ \t]+", " ")
$cleanHtml = [regex]::Replace($cleanHtml, "\r?\n\s*\r?\n", "`n")
$cleanHtml = $cleanHtml.Trim()

Set-Content -Path (Join-Path $distDir "index.html") -Value $cleanHtml -Encoding UTF8
Write-Host "[OK] index.html anonimizado gerado em /dist/index.html" -ForegroundColor Green

Write-Host "`nProcesso concluido com sucesso! A versao de producao esta pronta em /dist" -ForegroundColor Green
