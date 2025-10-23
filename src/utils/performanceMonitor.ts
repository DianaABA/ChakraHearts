/**
 * Performance Monitoring and Optimization System
 */

import React from "react";

interface PerformanceMetrics {
  frameRate: number;
  memoryUsage: number;
  assetLoadTime: number;
  renderTime: number;
  totalAssets: number;
  cachedAssets: number;
}

interface OptimizationSettings {
  enableLazyLoading: boolean;
  maxPreloadAssets: number;
  qualityLevel: "low" | "medium" | "high";
  enableAnimations: boolean;
  particleCount: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    frameRate: 0,
    memoryUsage: 0,
    assetLoadTime: 0,
    renderTime: 0,
    totalAssets: 0,
    cachedAssets: 0,
  };

  private frameCount = 0;
  private lastFrameTime = performance.now();
  private renderTimes: number[] = [];
  private settings: OptimizationSettings = {
    enableLazyLoading: true,
    maxPreloadAssets: 20,
    qualityLevel: "high",
    enableAnimations: true,
    particleCount: 50,
  };

  constructor() {
    this.startMonitoring();
    this.detectDeviceCapabilities();
  }

  /**
   * Start performance monitoring
   */
  private startMonitoring(): void {
    const monitor = () => {
      this.updateFrameRate();
      this.updateMemoryUsage();
      this.cleanupOldMetrics();
      requestAnimationFrame(monitor);
    };
    requestAnimationFrame(monitor);
  }

  /**
   * Update frame rate calculation
   */
  private updateFrameRate(): void {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;

    if (deltaTime >= 1000) {
      this.metrics.frameRate = (this.frameCount * 1000) / deltaTime;
      this.frameCount = 0;
      this.lastFrameTime = currentTime;
    } else {
      this.frameCount++;
    }
  }

  /**
   * Update memory usage if available
   */
  private updateMemoryUsage(): void {
    if ("memory" in performance) {
      const memory = (
        performance as Performance & { memory: { usedJSHeapSize: number } }
      ).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
    }
  }

  /**
   * Clean up old performance data
   */
  private cleanupOldMetrics(): void {
    const maxSamples = 100;
    if (this.renderTimes.length > maxSamples) {
      this.renderTimes = this.renderTimes.slice(-maxSamples);
    }
  }

  /**
   * Detect device capabilities and adjust settings
   */
  private detectDeviceCapabilities(): void {
    // Check hardware acceleration
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const hasWebGL = !!gl;

    // Check device memory (if available)
    const deviceMemory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4; // Default 4GB

    // Check connection speed
    const connection = (
      navigator as Navigator & { connection?: { effectiveType: string } }
    ).connection;
    const isSlowConnection =
      connection &&
      (connection.effectiveType === "2g" || connection.effectiveType === "3g");

    // Adjust settings based on capabilities
    if (!hasWebGL || deviceMemory < 4 || isSlowConnection) {
      this.settings.qualityLevel = "medium";
      this.settings.maxPreloadAssets = 10;
      this.settings.particleCount = 25;
    }

    if (deviceMemory < 2) {
      this.settings.qualityLevel = "low";
      this.settings.maxPreloadAssets = 5;
      this.settings.enableAnimations = false;
      this.settings.particleCount = 10;
    }
  }

  /**
   * Record render time
   */
  recordRenderTime(startTime: number): void {
    const renderTime = performance.now() - startTime;
    this.renderTimes.push(renderTime);
    this.metrics.renderTime = this.getAverageRenderTime();
  }

  /**
   * Get average render time
   */
  private getAverageRenderTime(): number {
    if (this.renderTimes.length === 0) return 0;
    const sum = this.renderTimes.reduce((a, b) => a + b, 0);
    return sum / this.renderTimes.length;
  }

  /**
   * Record asset load time
   */
  recordAssetLoadTime(loadTime: number): void {
    this.metrics.assetLoadTime = loadTime;
  }

  /**
   * Update asset counts
   */
  updateAssetCounts(total: number, cached: number): void {
    this.metrics.totalAssets = total;
    this.metrics.cachedAssets = cached;
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get optimization settings
   */
  getSettings(): OptimizationSettings {
    return { ...this.settings };
  }

  /**
   * Update settings
   */
  updateSettings(newSettings: Partial<OptimizationSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }

  /**
   * Auto-optimize based on performance
   */
  autoOptimize(): void {
    const { frameRate, memoryUsage } = this.metrics;

    // If frame rate is too low, reduce quality
    if (frameRate < 30 && frameRate > 0) {
      if (this.settings.qualityLevel === "high") {
        this.settings.qualityLevel = "medium";
        this.settings.particleCount = Math.max(
          25,
          this.settings.particleCount - 10
        );
      } else if (this.settings.qualityLevel === "medium") {
        this.settings.qualityLevel = "low";
        this.settings.enableAnimations = false;
        this.settings.particleCount = Math.max(
          10,
          this.settings.particleCount - 15
        );
      }
    }

    // If memory usage is high, reduce cache
    if (memoryUsage > 200) {
      // 200MB threshold
      this.settings.maxPreloadAssets = Math.max(
        5,
        this.settings.maxPreloadAssets - 5
      );
    }

    // If performance is good, gradually increase quality
    if (frameRate > 55 && memoryUsage < 100) {
      if (this.settings.qualityLevel === "low") {
        this.settings.qualityLevel = "medium";
        this.settings.enableAnimations = true;
      } else if (this.settings.qualityLevel === "medium") {
        this.settings.qualityLevel = "high";
        this.settings.particleCount = Math.min(
          50,
          this.settings.particleCount + 5
        );
      }
    }
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    const { frameRate, memoryUsage, renderTime, totalAssets, cachedAssets } =
      this.metrics;
    const cacheHitRate =
      totalAssets > 0 ? ((cachedAssets / totalAssets) * 100).toFixed(1) : "0";

    return `
Performance Report:
- Frame Rate: ${frameRate.toFixed(1)} FPS
- Memory Usage: ${memoryUsage.toFixed(1)} MB
- Average Render Time: ${renderTime.toFixed(2)} ms
- Assets: ${totalAssets} total, ${cachedAssets} cached (${cacheHitRate}% hit rate)
- Quality Level: ${this.settings.qualityLevel}
- Animations: ${this.settings.enableAnimations ? "Enabled" : "Disabled"}
- Particle Count: ${this.settings.particleCount}
    `.trim();
  }
}

// Global performance monitor
export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitor(): {
  metrics: PerformanceMetrics;
  settings: OptimizationSettings;
  updateSettings: (settings: Partial<OptimizationSettings>) => void;
  autoOptimize: () => void;
} {
  const [metrics, setMetrics] = React.useState(performanceMonitor.getMetrics());
  const [settings, setSettings] = React.useState(
    performanceMonitor.getSettings()
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics());
      setSettings(performanceMonitor.getSettings());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateSettings = React.useCallback(
    (newSettings: Partial<OptimizationSettings>) => {
      performanceMonitor.updateSettings(newSettings);
      setSettings(performanceMonitor.getSettings());
    },
    []
  );

  const autoOptimize = React.useCallback(() => {
    performanceMonitor.autoOptimize();
    setSettings(performanceMonitor.getSettings());
  }, []);

  return {
    metrics,
    settings,
    updateSettings,
    autoOptimize,
  };
}

/**
 * Performance-aware render wrapper
 */
export function withPerformanceTracking<
  T extends React.ComponentType<Record<string, unknown>>
>(Component: T, componentName: string): T {
  const WrappedComponent = (props: Record<string, unknown>) => {
    const renderStart = React.useRef(0);

    React.useLayoutEffect(() => {
      renderStart.current = performance.now();
    });

    React.useEffect(() => {
      performanceMonitor.recordRenderTime(renderStart.current);
    });

    return React.createElement(Component, props);
  };

  WrappedComponent.displayName = `withPerformanceTracking(${componentName})`;
  return WrappedComponent as T;
}
