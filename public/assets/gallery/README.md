# 🎨 Chakra Hearts - Art Gallery

This folder contains all the artwork for the in-game gallery system.

## Folder Structure:

### 📁 `/special/`
- **Your special artworks** - Place your custom artworks here
- These will be unlocked as players progress through the story
- Supports: `.png`, `.jpg`, `.webp` formats

### 📁 `/characters/`
- Character portraits and artwork
- Agnivesh, Elena, Santi, Aurora, David, etc.

### 📁 `/scenes/` 
- Scene backgrounds and environmental art
- Temple ruins, chakra awakenings, dramatic moments

### 📁 `/concepts/`
- Concept art and spiritual visualizations
- Chakra diagrams, spiritual symbols, etc.

## How to Add Your Artwork:

1. **Place your images** in the appropriate folder
2. **Update the gallery data** in `src/components/ui/GameHUD.tsx`
3. **Add to `galleryArtworks` array** with this format:

```javascript
{
  id: "unique_id",
  title: "Your Artwork Title", 
  description: "Description of the artwork",
  imageSrc: "/assets/gallery/special/your_image.png",
  category: "special",
  unlocked: true, // or false if it should be unlocked later
}
```

## Recommended Image Specifications:
- **Resolution**: 1920x1080 or higher for full-size viewing
- **Thumbnails**: Will be auto-generated at 250x140
- **Formats**: PNG (best quality), JPG (smaller file), WebP (modern)
- **Aspect Ratio**: 16:9 for scenes, any ratio for character art

## Gallery Features:
- ✅ Category filtering
- ✅ Locked/unlocked system
- ✅ Full-size artwork viewer
- ✅ Progress tracking
- ✅ Beautiful animations

Ready for your special artworks! 🌟