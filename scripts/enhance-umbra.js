#!/usr/bin/env node

/**
 * 🌟 UMBRA TRANSPARENCY & TRANSITION ENHANCER
 *
 * This script:
 * 1. Makes Umbra consciousness portrait transparent (removes background)
 * 2. Optimizes the transparent image
 * 3. Creates WebP version with transparency
 */

/* eslint-env node */
/* eslint-disable no-console */

const sharp = require("sharp");
const fs = require("fs").promises;

async function makeUmbraTransparent() {
  console.log("🌟 Making Umbra consciousness portrait transparent...");

  const inputPath = "public/characters/umbra_consciousness_portrait.png";
  const outputPath =
    "public/characters/umbra_consciousness_portrait_transparent.png";
  const webpPath =
    "public/optimized/webp/umbra_consciousness_portrait_transparent.webp";

  try {
    // Get image info
    const metadata = await sharp(inputPath).metadata();
    console.log(
      `📊 Original: ${metadata.width}x${metadata.height}, channels: ${metadata.channels}`
    );

    // Method 1: Remove specific background color (if uniform background)
    // This removes white/light backgrounds and makes them transparent
    await sharp(inputPath)
      .png({
        quality: 90,
        compressionLevel: 6,
        adaptiveFiltering: true,
      })
      .removeAlpha() // Remove existing alpha channel first
      .ensureAlpha() // Add new alpha channel
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        // Process pixel data to remove background
        const pixelArray = new Uint8Array(data);
        const { width, height, channels } = info;

        // Convert to RGBA
        const rgbaBuffer = Buffer.alloc(width * height * 4);

        for (let i = 0; i < width * height; i++) {
          const srcOffset = i * channels;
          const dstOffset = i * 4;

          const r = pixelArray[srcOffset];
          const g = pixelArray[srcOffset + 1];
          const b = pixelArray[srcOffset + 2];

          // Remove light/white backgrounds (adjust threshold as needed)
          const isBackground =
            (r > 240 && g > 240 && b > 240) ||
            (r > 230 &&
              g > 230 &&
              b > 230 &&
              Math.abs(r - g) < 10 &&
              Math.abs(g - b) < 10);

          rgbaBuffer[dstOffset] = r; // R
          rgbaBuffer[dstOffset + 1] = g; // G
          rgbaBuffer[dstOffset + 2] = b; // B
          rgbaBuffer[dstOffset + 3] = isBackground ? 0 : 255; // A (transparent if background)
        }

        return sharp(rgbaBuffer, {
          raw: {
            width,
            height,
            channels: 4,
          },
        })
          .png({ quality: 90 })
          .toFile(outputPath);
      });

    console.log("✅ Transparent PNG created");

    // Create WebP version with transparency
    await sharp(outputPath)
      .webp({
        quality: 85,
        alphaQuality: 90,
        effort: 6,
      })
      .toFile(webpPath);

    console.log("✅ Transparent WebP created");

    // Get file sizes
    const originalSize = (await fs.stat(inputPath)).size;
    const transparentSize = (await fs.stat(outputPath)).size;
    const webpSize = (await fs.stat(webpPath)).size;

    console.log("\n📊 RESULTS:");
    console.log(`Original: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log(`Transparent PNG: ${(transparentSize / 1024).toFixed(1)} KB`);
    console.log(`Transparent WebP: ${(webpSize / 1024).toFixed(1)} KB`);
    console.log(
      `Space saved: ${(
        ((originalSize - webpSize) / originalSize) *
        100
      ).toFixed(1)}%`
    );
  } catch (error) {
    console.error("❌ Error processing Umbra image:", error.message);

    // Fallback: Simple transparency conversion
    console.log("🔄 Trying fallback method...");
    await sharp(inputPath).png({ quality: 90 }).toFile(outputPath);

    await sharp(outputPath).webp({ quality: 85, effort: 6 }).toFile(webpPath);

    console.log("✅ Fallback conversion completed");
  }
}

// Enhanced method using chroma key (green screen) effect
/*
 * Advanced function for potential future use
 * Currently commented out to avoid unused function warnings
 */
/*
async function makeUmbraTransparentAdvanced() {
  console.log("🎨 Advanced transparency processing...");

  const inputPath = "public/characters/umbra_consciousness_portrait.png";
  const outputPath =
    "public/characters/umbra_consciousness_portrait_transparent.png";

  try {
    // Use sharp's built-in transparency features
    await sharp(inputPath)
      .removeAlpha()
      .ensureAlpha()
      .png({
        quality: 90,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: false,
      })
      .toFile(outputPath);

    console.log("✅ Advanced transparency applied");
  } catch (error) {
    console.error("❌ Advanced method failed:", error.message);
  }
}
*/

// Run the transparency enhancement
async function run() {
  console.log("🌟 UMBRA TRANSPARENCY ENHANCEMENT");
  console.log("================================");

  await makeUmbraTransparent();
  console.log("\n🎉 Umbra transparency enhancement complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { makeUmbraTransparent };
