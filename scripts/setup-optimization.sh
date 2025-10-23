#!/bin/bash

# 🚀 Chakra Hearts - Image Optimization Setup Script
# This script installs dependencies and runs the optimization

echo "🖼️  CHAKRA HEARTS - IMAGE OPTIMIZATION SETUP"
echo "============================================="

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

echo "📦 Installing image optimization dependencies..."

# Install the required packages
npm install --save-dev sharp imagemin imagemin-pngquant imagemin-webp imagemin-mozjpeg

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎯 Available optimization commands:"
    echo "  npm run optimize-images   - Full optimization suite"
    echo "  npm run optimize-webp     - Quick WebP conversion only"
    echo ""
    echo "🚀 Would you like to run the quick WebP optimization now? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "🔄 Running WebP optimization..."
        npm run optimize-webp
    else
        echo "👍 Setup complete! Run optimization when ready."
    fi
else
    echo "❌ Failed to install dependencies. Please check your npm configuration."
    exit 1
fi