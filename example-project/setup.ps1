# Tailwind CSS 4 + daisyUI 项目设置脚本

Write-Host "🚀 开始设置 Tailwind CSS 4 + daisyUI 示例项目..." -ForegroundColor Green

# 检查 Node.js 是否安装
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js 版本: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 请先安装 Node.js" -ForegroundColor Red
    exit 1
}

# 检查 npm 是否可用
try {
    $npmVersion = npm --version
    Write-Host "✅ npm 版本: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm 不可用" -ForegroundColor Red
    exit 1
}

# 安装依赖
Write-Host "📦 安装项目依赖..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 依赖安装成功!" -ForegroundColor Green
} else {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}

# daisyUI 无需 CLI，确保在 CSS 中通过 @plugin "daisyui" 已启用

Write-Host ""
Write-Host "🎉 项目设置完成!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 可用命令:" -ForegroundColor Cyan
Write-Host "  npm run dev     - 启动开发服务器" -ForegroundColor White
Write-Host "  npm run build   - 构建生产版本" -ForegroundColor White
Write-Host "  npm run preview - 预览生产版本" -ForegroundColor White
Write-Host ""
Write-Host "🌐 启动开发服务器:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
