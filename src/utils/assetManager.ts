/**
 * Asset Management System with Lazy Loading and Caching
 */

import React from "react";

interface AssetCache {
  [key: string]: {
    data: string | HTMLImageElement;
    timestamp: number;
    size: number;
  };
}

class AssetManager {
  private cache: AssetCache = {};
  private maxCacheSize = 100 * 1024 * 1024; // 100MB
  private currentCacheSize = 0;
  private preloadQueue: Set<string> = new Set();
  private loadingPromises: Map<string, Promise<string | HTMLImageElement>> =
    new Map();

  /**
   * Preload assets for better performance
   */
  async preloadAssets(assetPaths: string[]): Promise<void> {
    const promises = assetPaths.map((path) => this.loadAsset(path));
    await Promise.allSettled(promises);
  }

  /**
   * Load asset with caching
   */
  async loadAsset(path: string): Promise<string | HTMLImageElement> {
    // Check cache first
    if (this.cache[path]) {
      this.cache[path].timestamp = Date.now();
      return this.cache[path].data;
    }

    // Check if already loading
    if (this.loadingPromises.has(path)) {
      return this.loadingPromises.get(path)!;
    }

    // Start loading
    const loadPromise = this.loadAssetFromNetwork(path);
    this.loadingPromises.set(path, loadPromise);

    try {
      const asset = await loadPromise;
      this.cacheAsset(path, asset);
      return asset;
    } finally {
      this.loadingPromises.delete(path);
    }
  }

  /**
   * Load asset from network
   */
  private async loadAssetFromNetwork(
    path: string
  ): Promise<string | HTMLImageElement> {
    // Determine asset type
    const isImage = /\.(png|jpg|jpeg|webp|gif)$/i.test(path);

    if (isImage) {
      return this.loadImage(path);
    } else {
      const response = await fetch(path);
      return response.text();
    }
  }

  /**
   * Load image as HTMLImageElement
   */
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Cache asset with size management
   */
  private cacheAsset(path: string, asset: string | HTMLImageElement): void {
    const size = this.estimateAssetSize(asset);

    // Clear cache if needed
    this.ensureCacheSpace(size);

    this.cache[path] = {
      data: asset,
      timestamp: Date.now(),
      size,
    };

    this.currentCacheSize += size;
  }

  /**
   * Estimate asset size
   */
  private estimateAssetSize(asset: string | HTMLImageElement): number {
    if (typeof asset === "string") {
      return asset.length * 2; // Rough estimate for string
    } else {
      // Rough estimate for image based on dimensions
      return (asset.width || 1024) * (asset.height || 768) * 4; // RGBA
    }
  }

  /**
   * Ensure cache has enough space
   */
  private ensureCacheSpace(requiredSize: number): void {
    if (this.currentCacheSize + requiredSize <= this.maxCacheSize) {
      return;
    }

    // Sort by last used (LRU)
    const entries = Object.entries(this.cache).sort(
      ([, a], [, b]) => a.timestamp - b.timestamp
    );

    // Remove oldest entries until we have space
    for (const [path, entry] of entries) {
      delete this.cache[path];
      this.currentCacheSize -= entry.size;

      if (this.currentCacheSize + requiredSize <= this.maxCacheSize) {
        break;
      }
    }
  }

  /**
   * Preload scene assets
   */
  async preloadScene(sceneAssets: {
    background?: string;
    characters: string[];
    props: string[];
    ui: string[];
  }): Promise<void> {
    const allAssets = [
      sceneAssets.background,
      ...sceneAssets.characters,
      ...sceneAssets.props,
      ...sceneAssets.ui,
    ].filter(Boolean) as string[];

    await this.preloadAssets(allAssets);
  }

  /**
   * Clean up unused assets
   */
  cleanup(keepAssets: Set<string>): void {
    Object.keys(this.cache).forEach((path) => {
      if (!keepAssets.has(path)) {
        this.currentCacheSize -= this.cache[path].size;
        delete this.cache[path];
      }
    });
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    maxSize: number;
    itemCount: number;
    hitRate: number;
  } {
    return {
      size: this.currentCacheSize,
      maxSize: this.maxCacheSize,
      itemCount: Object.keys(this.cache).length,
      hitRate: 0, // TODO: Implement hit rate tracking
    };
  }
}

// Global asset manager instance
export const assetManager = new AssetManager();

/**
 * React hook for asset loading
 */
export function useAsset(path: string): {
  asset: string | HTMLImageElement | null;
  loading: boolean;
  error: Error | null;
} {
  const [asset, setAsset] = React.useState<string | HTMLImageElement | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!path) {
      setAsset(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    assetManager
      .loadAsset(path)
      .then((loadedAsset) => {
        setAsset(loadedAsset);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [path]);

  return { asset, loading, error };
}

/**
 * React hook for preloading assets
 */
export function useAssetPreloader(paths: string[]): {
  loaded: boolean;
  progress: number;
} {
  const [loaded, setLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (paths.length === 0) {
      setLoaded(true);
      setProgress(100);
      return;
    }

    let loadedCount = 0;
    setLoaded(false);
    setProgress(0);

    const promises = paths.map((path) =>
      assetManager.loadAsset(path).then(() => {
        loadedCount++;
        setProgress((loadedCount / paths.length) * 100);
      })
    );

    Promise.all(promises).then(() => {
      setLoaded(true);
      setProgress(100);
    });
  }, [paths]);

  return { loaded, progress };
}
