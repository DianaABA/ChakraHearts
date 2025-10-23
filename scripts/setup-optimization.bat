@echo off
REM 🚀 Chakra Hearts - Image Optimization Setup Script (Windows)
REM This script installs dependencies and runs the optimization

echo 🖼️  CHAKRA HEARTS - IMAGE OPTIMIZATION SETUP
echo =============================================

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

echo 📦 Installing image optimization dependencies...

REM Install the required packages
call npm install --save-dev sharp imagemin imagemin-pngquant imagemin-webp imagemin-mozjpeg

if %errorlevel% == 0 (
    echo ✅ Dependencies installed successfully!
    echo.
    echo 🎯 Available optimization commands:
    echo   npm run optimize-images   - Full optimization suite
    echo   npm run optimize-webp     - Quick WebP conversion only
    echo.
    echo 🚀 Would you like to run the quick WebP optimization now? (y/n^)
    set /p response=
    
    if /i "%response%"=="y" (
        echo 🔄 Running WebP optimization...
        call npm run optimize-webp
    ) else (
        echo 👍 Setup complete! Run optimization when ready.
    )
) else (
    echo ❌ Failed to install dependencies. Please check your npm configuration.
    pause
    exit /b 1
)

pause