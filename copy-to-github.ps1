# PowerShell 脚本：复制文件到 GitHub 仓库
# 使用方法：在项目根目录运行 .\copy-to-github.ps1

Write-Host "开始复制文件到 GitHub 仓库..." -ForegroundColor Green

# 定义源路径和目标路径
$sourceRoot = "."
$targetRoot = "D:\path\to\your\vue-modal-repo"  # 请修改为您的 GitHub 仓库本地路径

# 创建目标目录（如果不存在）
if (!(Test-Path $targetRoot)) {
    New-Item -ItemType Directory -Path $targetRoot -Force
    Write-Host "创建目标目录: $targetRoot" -ForegroundColor Yellow
}

# 复制源代码文件夹
Write-Host "复制 src 文件夹..." -ForegroundColor Blue
Copy-Item -Path "$sourceRoot\src" -Destination "$targetRoot\src" -Recurse -Force

# 复制构建输出文件夹
Write-Host "复制 dist 文件夹..." -ForegroundColor Blue
Copy-Item -Path "$sourceRoot\dist" -Destination "$targetRoot\dist" -Recurse -Force

# 复制配置文件
Write-Host "复制配置文件..." -ForegroundColor Blue
Copy-Item -Path "$sourceRoot\vite.config.ts" -Destination "$targetRoot\vite.config.ts" -Force
Copy-Item -Path "$sourceRoot\tsconfig.json" -Destination "$targetRoot\tsconfig.json" -Force
Copy-Item -Path "$sourceRoot\tsconfig.build.json" -Destination "$targetRoot\tsconfig.build.json" -Force

# 复制 package.json（如果需要更新）
Write-Host "复制 package.json..." -ForegroundColor Blue
Copy-Item -Path "$sourceRoot\package.json" -Destination "$targetRoot\package.json" -Force

# 复制 README.md（如果需要更新）
Write-Host "复制 README.md..." -ForegroundColor Blue
Copy-Item -Path "$sourceRoot\README.md" -Destination "$targetRoot\README.md" -Force

Write-Host "文件复制完成！" -ForegroundColor Green
Write-Host "请进入 $targetRoot 目录,然后运行以下命令推送到 GitHub：" -ForegroundColor Yellow
Write-Host "cd $targetRoot" -ForegroundColor Cyan
Write-Host "git add ." -ForegroundColor Cyan
Write-Host "git commit -m 'Add complete source code and build files'" -ForegroundColor Cyan
Write-Host "git push origin main" -ForegroundColor Cyan
