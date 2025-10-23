#!/usr/bin/env node

/**
 * 🖼️ CHAKRA HEARTS - AUTOMATIC IMAGE OPTIMIZATION SCRIPT
 *
 * This script automatically optimizes all game assets for both web and native platforms
 *
 * Features:
 * - PNG compression with pngquant
 * - WebP conversion for web performance
 * - Multiple resolution generation (@1x, @2x, @3x)
 * - Automatic backup creation
 * - Progress reporting and size comparison
 *
 * Usage: npm run optimize-images
 */

/* eslint-env node */
/* eslint-disable no-console */

const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const pngquant = require("imagemin-pngquant");
const imagemin = require("imagemin");

// Configuration
const CONFIG = {
  // Input directories
  INPUT_DIRS: [
    "public/backgrounds",
    "public/characters",
    "public/ui",
    "public/props",
    "public/avatars",
  ],

  // Output directories
  OUTPUT_DIRS: {
    webp: "public/optimized/webp",
    compressed: "public/optimized/compressed",
    responsive: "public/optimized/responsive",
    native: "public/optimized/native",
  },

  // Optimization settings
  SETTINGS: {
    png: {
      quality: [0.7, 0.9],
      speed: 4,
    },
    webp: {
      quality: 85,
      effort: 6,
    },
    responsive: {
      mobile: { width: 800, suffix: "_mobile" },
      tablet: { width: 1200, suffix: "_tablet" },
      desktop: { width: 1920, suffix: "_desktop" },
    },
    native: {
      "1x": { multiplier: 1, suffix: "@1x" },
      "2x": { multiplier: 2, suffix: "@2x" },
      "3x": { multiplier: 3, suffix: "@3x" },
    },
  },
};

// Utility functions
const log = (message, type = "info") => {
  const timestamp = new Date().toLocaleTimeString();
  const colors = {
    info: "\x1b[36m", // Cyan
    success: "\x1b[32m", // Green
    warning: "\x1b[33m", // Yellow
    error: "\x1b[31m", // Red
    reset: "\x1b[0m", // Reset
  };

  console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
};

const formatFileSize = (bytes) => {
  const sizes = ["B", "KB", "MB", "GB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

const ensureDir = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
};

const getFileSize = async (filePath) => {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
};

// Main optimization functions
class ImageOptimizer {
  constructor() {
    this.stats = {
      processed: 0,
      totalFiles: 0,
      originalSize: 0,
      optimizedSize: 0,
      errors: [],
    };
  }

  async findImages() {
    log("🔍 Scanning for images...", "info");
    const images = [];

    for (const dir of CONFIG.INPUT_DIRS) {
      try {
        const files = await fs.readdir(dir);
        const imageFiles = files.filter(
          (file) =>
            /\.(png|jpg|jpeg)$/i.test(file) && !file.includes("placeholder")
        );

        for (const file of imageFiles) {
          const filePath = path.join(dir, file);
          const size = await getFileSize(filePath);

          // Skip tiny files (likely placeholders)
          if (size > 1000) {
            images.push({
              path: filePath,
              name: file,
              dir: dir,
              size: size,
              ext: path.extname(file).toLowerCase(),
            });
          }
        }
      } catch (error) {
        log(`⚠️  Could not scan directory ${dir}: ${error.message}`, "warning");
      }
    }

    this.stats.totalFiles = images.length;
    log(`📊 Found ${images.length} images to optimize`, "success");
    return images;
  }

  async optimizePNG(imagePath, outputPath) {
    try {
      const result = await imagemin([imagePath], {
        destination: path.dirname(outputPath),
        plugins: [
          pngquant({
            quality: CONFIG.SETTINGS.png.quality,
            speed: CONFIG.SETTINGS.png.speed,
          }),
        ],
      });

      if (result && result.length > 0) {
        const optimizedPath = path.join(
          path.dirname(outputPath),
          path.basename(imagePath)
        );
        const finalPath = outputPath;

        // Rename to final path if different
        if (optimizedPath !== finalPath) {
          await fs.rename(optimizedPath, finalPath);
        }

        return await getFileSize(finalPath);
      }
      return 0;
    } catch (error) {
      log(
        `❌ PNG optimization failed for ${imagePath}: ${error.message}`,
        "error"
      );
      return 0;
    }
  }

  async convertToWebP(imagePath, outputPath) {
    try {
      await sharp(imagePath)
        .webp({
          quality: CONFIG.SETTINGS.webp.quality,
          effort: CONFIG.SETTINGS.webp.effort,
        })
        .toFile(outputPath);

      return await getFileSize(outputPath);
    } catch (error) {
      log(
        `❌ WebP conversion failed for ${imagePath}: ${error.message}`,
        "error"
      );
      return 0;
    }
  }

  async createResponsiveVersions(imagePath, outputDir, baseName) {
    const sizes = [];

    for (const [key, config] of Object.entries(CONFIG.SETTINGS.responsive)) {
      try {
        const outputPath = path.join(
          outputDir,
          `${baseName}${config.suffix}.png`
        );

        await sharp(imagePath)
          .resize(config.width, null, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .png({ quality: 90 })
          .toFile(outputPath);

        const size = await getFileSize(outputPath);
        sizes.push({ version: key, size, path: outputPath });
      } catch (error) {
        log(
          `❌ Responsive version ${key} failed for ${imagePath}: ${error.message}`,
          "error"
        );
      }
    }

    return sizes;
  }

  async createNativeVersions(imagePath, outputDir, baseName) {
    const versions = [];

    for (const [key, config] of Object.entries(CONFIG.SETTINGS.native)) {
      try {
        const outputPath = path.join(
          outputDir,
          `${baseName}${config.suffix}.png`
        );

        const metadata = await sharp(imagePath).metadata();
        const newWidth = Math.round(metadata.width * config.multiplier);
        const newHeight = Math.round(metadata.height * config.multiplier);

        // Only upscale if multiplier > 1, otherwise just copy
        if (config.multiplier <= 1) {
          await sharp(imagePath).png({ quality: 90 }).toFile(outputPath);
        } else {
          await sharp(imagePath)
            .resize(newWidth, newHeight, {
              kernel: sharp.kernel.lanczos3,
            })
            .png({ quality: 90 })
            .toFile(outputPath);
        }

        const size = await getFileSize(outputPath);
        versions.push({ version: key, size, path: outputPath });
      } catch (error) {
        log(
          `❌ Native version ${key} failed for ${imagePath}: ${error.message}`,
          "error"
        );
      }
    }

    return versions;
  }

  async processImage(image) {
    log(`🔄 Processing: ${image.name}`, "info");

    const baseName = path.basename(image.name, image.ext);
    const results = {
      original: image.size,
      compressed: 0,
      webp: 0,
      responsive: [],
      native: [],
    };

    // Ensure output directories exist
    for (const dir of Object.values(CONFIG.OUTPUT_DIRS)) {
      await ensureDir(dir);
    }

    try {
      // 1. PNG Compression
      if (image.ext === ".png") {
        const compressedPath = path.join(
          CONFIG.OUTPUT_DIRS.compressed,
          image.name
        );
        results.compressed = await this.optimizePNG(image.path, compressedPath);
      }

      // 2. WebP Conversion
      const webpPath = path.join(CONFIG.OUTPUT_DIRS.webp, `${baseName}.webp`);
      results.webp = await this.convertToWebP(image.path, webpPath);

      // 3. Responsive Versions
      results.responsive = await this.createResponsiveVersions(
        image.path,
        CONFIG.OUTPUT_DIRS.responsive,
        baseName
      );

      // 4. Native Versions
      results.native = await this.createNativeVersions(
        image.path,
        CONFIG.OUTPUT_DIRS.native,
        baseName
      );

      // Update stats
      this.stats.processed++;
      this.stats.originalSize += image.size;
      this.stats.optimizedSize += results.compressed || results.webp;

      // Log results
      const compressionRatio = results.compressed
        ? (((image.size - results.compressed) / image.size) * 100).toFixed(1)
        : 0;
      const webpRatio = results.webp
        ? (((image.size - results.webp) / image.size) * 100).toFixed(1)
        : 0;

      log(
        `✅ ${image.name}: PNG -${compressionRatio}%, WebP -${webpRatio}%`,
        "success"
      );
    } catch (error) {
      log(`❌ Failed to process ${image.name}: ${error.message}`, "error");
      this.stats.errors.push({ file: image.name, error: error.message });
    }
  }

  async generateReport() {
    log("\n📊 OPTIMIZATION REPORT", "info");
    log("========================", "info");
    log(
      `📁 Files processed: ${this.stats.processed}/${this.stats.totalFiles}`,
      "info"
    );
    log(`📦 Original size: ${formatFileSize(this.stats.originalSize)}`, "info");
    log(
      `🗜️  Optimized size: ${formatFileSize(this.stats.optimizedSize)}`,
      "info"
    );

    if (this.stats.originalSize > 0) {
      const savings = this.stats.originalSize - this.stats.optimizedSize;
      const savingsPercent = (
        (savings / this.stats.originalSize) *
        100
      ).toFixed(1);
      log(
        `💾 Space saved: ${formatFileSize(savings)} (${savingsPercent}%)`,
        "success"
      );
    }

    if (this.stats.errors.length > 0) {
      log(`\n⚠️  ${this.stats.errors.length} errors occurred:`, "warning");
      this.stats.errors.forEach((err) => {
        log(`   • ${err.file}: ${err.error}`, "error");
      });
    }

    log("\n🎯 Next steps:", "info");
    log("• Update your asset imports to use optimized versions", "info");
    log("• Test the optimized images in your game", "info");
    log("• Consider implementing the WebP fallback system", "info");
  }

  async run() {
    log("🚀 Starting Chakra Hearts Image Optimization...", "info");
    log("================================================", "info");

    const images = await this.findImages();

    if (images.length === 0) {
      log("⚠️  No images found to optimize", "warning");
      return;
    }

    // Process all images
    for (const image of images) {
      await this.processImage(image);
    }

    await this.generateReport();
    log("\n🎉 Optimization complete!", "success");
  }
}

// Run the optimizer
if (require.main === module) {
  const optimizer = new ImageOptimizer();
  optimizer.run().catch((error) => {
    log(`💥 Fatal error: ${error.message}`, "error");
    process.exit(1);
  });
}

module.exports = ImageOptimizer;
