# 🖼️ Chakra Hearts - Automatic Image Optimization

This directory contains scripts for automatically optimizing all game assets for both web and native platforms.

## 🚀 Quick Start

### Windows Users:

```bash
# Run the setup script
./scripts/setup-optimization.bat

# Or manually install and run
npm install --save-dev sharp imagemin imagemin-pngquant imagemin-webp imagemin-mozjpeg
npm run optimize-webp
```

### Linux/Mac Users:

```bash
# Run the setup script
chmod +x scripts/setup-optimization.sh
./scripts/setup-optimization.sh

# Or manually install and run
npm install --save-dev sharp imagemin imagemin-pngquant imagemin-webp imagemin-mozjpeg
npm run optimize-webp
```

## 📜 Available Scripts

| Command                   | Description             | Time         | Output                   |
| ------------------------- | ----------------------- | ------------ | ------------------------ |
| `npm run optimize-webp`   | Quick WebP conversion   | ~30 seconds  | WebP versions for web    |
| `npm run optimize-images` | Full optimization suite | ~2-3 minutes | All formats + responsive |

## 🎯 What Gets Optimized

### Input Directories:

- `public/backgrounds/` - Scene backgrounds
- `public/characters/` - Character portraits
- `public/ui/` - UI elements
- `public/props/` - Game props and items

### Output Directories:

- `public/optimized/webp/` - WebP versions for web
- `public/optimized/compressed/` - Compressed PNG files
- `public/optimized/responsive/` - Mobile/tablet/desktop sizes
- `public/optimized/native/` - @1x, @2x, @3x for React Native

## 📊 Expected Results

### WebP Conversion (Quick):

- **File size reduction:** 25-35% smaller
- **Quality:** Maintains visual quality
- **Compatibility:** Modern browsers (95%+ support)
- **Fallback:** Original PNG files remain

### Full Optimization Suite:

- **PNG compression:** 15-25% size reduction
- **WebP conversion:** 25-35% size reduction
- **Responsive images:** 3 sizes per image
- **Native variants:** 3 resolution densities

## 🔧 How It Works

### WebP Converter (`webp-converter.js`)

1. Scans all image directories
2. Converts PNG/JPG to WebP format
3. Maintains original quality (85% WebP quality)
4. Creates optimized versions in separate folder
5. Reports size savings

### Full Optimizer (`optimize-images.js`)

1. **PNG Compression:** Uses pngquant for smaller PNG files
2. **WebP Conversion:** Creates modern web format versions
3. **Responsive Images:** Generates mobile, tablet, desktop sizes
4. **Native Support:** Creates @1x, @2x, @3x for React Native
5. **Progress Tracking:** Shows detailed optimization report

## 📱 Using Optimized Images

### Web Platform (Recommended):

```typescript
// Update your components to use WebP with PNG fallback
<picture>
  <source srcSet="/optimized/webp/scene_background.webp" type="image/webp" />
  <img src="/backgrounds/scene_background.png" alt="Scene" />
</picture>
```

### Native Platform:

```typescript
// Use appropriate resolution for device
const getImageSource = (baseName: string) => {
  const pixelRatio = PixelRatio.get();
  if (pixelRatio >= 3) return `/optimized/native/${baseName}@3x.png`;
  if (pixelRatio >= 2) return `/optimized/native/${baseName}@2x.png`;
  return `/optimized/native/${baseName}@1x.png`;
};
```

### Responsive Images:

```typescript
// Use appropriate size for screen
const getResponsiveImage = (baseName: string, screenWidth: number) => {
  if (screenWidth <= 800) return `/optimized/responsive/${baseName}_mobile.png`;
  if (screenWidth <= 1200)
    return `/optimized/responsive/${baseName}_tablet.png`;
  return `/optimized/responsive/${baseName}_desktop.png`;
};
```

## 🛠️ Configuration

Edit the configuration in `optimize-images.js`:

```javascript
const CONFIG = {
  // Adjust quality settings
  SETTINGS: {
    png: {
      quality: [0.7, 0.9], // PNG compression quality range
      speed: 4, // Compression speed (1-10)
    },
    webp: {
      quality: 85, // WebP quality (0-100)
      effort: 6, // Compression effort (0-6)
    },
    // ... more settings
  },
};
```

## 🔍 Troubleshooting

### Common Issues:

1. **"sharp not found"**

   ```bash
   npm install --save-dev sharp
   ```

2. **"Permission denied on Linux/Mac"**

   ```bash
   chmod +x scripts/setup-optimization.sh
   ```

3. **"Module not found"**

   ```bash
   npm install  # Reinstall all dependencies
   ```

4. **Large file warnings:**
   - Files over 2MB will show warnings
   - Consider using responsive images for large backgrounds

### Performance Tips:

- Run optimization during development, not in production builds
- Backup original images before optimization
- Test optimized images in your game before deploying

## 📈 Monitoring

The scripts provide detailed reports:

- Files processed count
- Original vs optimized sizes
- Compression ratios per file
- Total space savings
- Error logs for failed conversions

---

_Last updated: October 22, 2025_
_Chakra Hearts Visual Novel Project_
