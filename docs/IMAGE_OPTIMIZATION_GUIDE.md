# 🖼️ Chakra Hearts - Cross-Platform Image Optimization Guide

## 📊 Current Status Assessment

### ✅ **Strengths:**

- PNG format: Universal compatibility (web + native)
- High resolution: Good for retina displays
- RGBA transparency: Perfect for character portraits
- Consistent dimensions: Good aspect ratios

### ⚠️ **Areas Needing Optimization:**

**File Analysis:**

- **21 actual PNG images** (working)
- **12 placeholder text files** (need real images)
- **Largest files:** 2.6MB+ per background
- **No modern formats:** Missing WebP/AVIF for web

---

## 🎯 Optimization Strategies

### 1. **Web Platform Optimizations**

#### A. Add WebP Support (25-35% size reduction)

```typescript
// In backgrounds.ts - Add WebP variants
export const BACKGROUNDS_WEBP = {
  NAGA_FIGHT_EPIC: "/backgrounds/sc1a_naga_fight_epic.webp",
  TEMPLE_BURNING: "/backgrounds/pro_ep1_temple_burning_destruction.webp",
  // ... other backgrounds
} as const;

// Component usage with fallback
<picture>
  <source srcSet={background.replace(".png", ".webp")} type="image/webp" />
  <img src={background} alt="Scene background" />
</picture>;
```

#### B. Responsive Images

```typescript
// Add multiple sizes for different screens
export const BACKGROUND_SIZES = {
  MOBILE: "_mobile.png", // 800x600
  TABLET: "_tablet.png", // 1200x900
  DESKTOP: "", // Full size
} as const;
```

### 2. **Native Platform Optimizations**

#### A. Asset Bundle Strategy

```
public/
├── backgrounds/
│   ├── @1x/      # Standard resolution
│   ├── @2x/      # Retina displays
│   └── @3x/      # Super retina
```

#### B. Lazy Loading System

```typescript
// Only load images when scenes are accessed
const useImagePreloader = (sceneId: string) => {
  useEffect(() => {
    const preloadSceneAssets = async () => {
      const scene = SCENES[sceneId];
      if (scene.background) {
        const img = new Image();
        img.src = scene.background;
      }
    };
    preloadSceneAssets();
  }, [sceneId]);
};
```

### 3. **Build-Time Optimizations**

#### A. Vite Image Processing Plugin

```bash
# Install image optimization
npm install --save-dev vite-plugin-imagemin imagemin-webp imagemin-mozjpeg
```

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { ViteImageOptimize } from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    ViteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      pngquant: { quality: [0.8, 0.9] },
      webp: { quality: 85 },
    }),
  ],
});
```

---

## 📱 Platform-Specific Recommendations

### **Web Platform:**

1. **Add WebP conversion** for 25-35% size reduction
2. **Implement lazy loading** for better performance
3. **Use responsive images** for different screen sizes
4. **Enable compression** in build process

### **Native Platform (React Native/Expo):**

1. **Bundle optimization**: Move large assets to CDN
2. **Multiple resolution sets**: @1x, @2x, @3x variants
3. **Asset caching**: Local storage for downloaded images
4. **Progressive loading**: Show low-res placeholder first

---

## 🔧 Implementation Priority

### **Phase 1: Quick Wins** (1-2 hours)

- [ ] Add Vite image optimization plugin
- [ ] Enable gzip compression for PNG files
- [ ] Implement basic lazy loading

### **Phase 2: Modern Formats** (2-3 hours)

- [ ] Convert critical backgrounds to WebP
- [ ] Add picture element with fallbacks
- [ ] Test browser compatibility

### **Phase 3: Native Preparation** (3-4 hours)

- [ ] Create multiple resolution variants
- [ ] Implement asset preloading system
- [ ] Add bundle size monitoring

---

## 📊 Expected Improvements

| Optimization    | Web Benefit       | Native Benefit           |
| --------------- | ----------------- | ------------------------ |
| WebP Format     | -35% size         | -35% bundle size         |
| Lazy Loading    | -60% initial load | -40% memory usage        |
| Resolution Sets | Better UX         | -50% memory on lower DPI |
| Compression     | -20% transfer     | -20% bundle size         |

**Total Expected Reduction:** 50-70% smaller assets with better performance

---

## 🎮 Game-Specific Notes

- **Critical backgrounds**: Prologue and Episode 1 scenes (optimize first)
- **Character portraits**: Already optimized with RGBA transparency
- **UI elements**: Consider SVG for scalable interface components
- **Transitions**: Keep PNG for complex gradients and effects

---

_Last updated: October 22, 2025_
_Project: Chakra Hearts Visual Novel_
