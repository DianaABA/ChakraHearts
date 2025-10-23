#!/usr/bin/env node

/**
 * 🚀 QUICK WEBP CONVERTER - Chakra Hearts
 *
 * Simple script to convert PNG/JPG images to WebP format
 * for immediate web performance improvements
 */

/* eslint-env node */
/* eslint-disable no-console */

const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

const DIRECTORIES = [
  "public/backgrounds",
  "public/characters",
  "public/ui",
  "public/props",
];

const OUTPUT_DIR = "public/optimized/webp";
const WEBP_QUALITY = 85;

async function convertToWebP() {
  console.log("🔄 Converting images to WebP...");

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let totalFiles = 0;
  let convertedFiles = 0;
  let totalSavings = 0;

  for (const dir of DIRECTORIES) {
    try {
      const files = await fs.readdir(dir);
      const imageFiles = files.filter(
        (file) =>
          /\.(png|jpg|jpeg)$/i.test(file) && !file.includes("placeholder")
      );

      for (const file of imageFiles) {
        totalFiles++;
        const inputPath = path.join(dir, file);
        const baseName = path.basename(file, path.extname(file));
        const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

        try {
          // Get original file size
          const originalStats = await fs.stat(inputPath);
          const originalSize = originalStats.size;

          // Convert to WebP
          await sharp(inputPath)
            .webp({ quality: WEBP_QUALITY })
            .toFile(outputPath);

          // Get new file size
          const newStats = await fs.stat(outputPath);
          const newSize = newStats.size;

          const savings = originalSize - newSize;
          const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

          totalSavings += savings;
          convertedFiles++;

          console.log(
            `✅ ${file} -> ${baseName}.webp (${savingsPercent}% smaller)`
          );
        } catch (error) {
          console.log(`❌ Failed to convert ${file}: ${error.message}`);
        }
      }
    } catch (error) {
      console.log(`⚠️  Could not access directory ${dir}`);
    }
  }

  console.log("\n📊 CONVERSION SUMMARY:");
  console.log(`📁 Files processed: ${convertedFiles}/${totalFiles}`);
  console.log(
    `💾 Total space saved: ${(totalSavings / 1024 / 1024).toFixed(2)} MB`
  );
  console.log("🎉 WebP conversion complete!");
}

convertToWebP().catch(console.error);
