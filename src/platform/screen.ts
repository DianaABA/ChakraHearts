/** Web fullscreen helpers. Swap with RN implementations later. */

export const display = {
  isFullscreen(): boolean {
    return !!document.fullscreenElement;
  },
  async enterFullscreen(): Promise<void> {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => {});
    }
  },
  async exitFullscreen(): Promise<void> {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
  },
  async toggleFullscreen(): Promise<void> {
    if (this.isFullscreen()) {
      await this.exitFullscreen();
    } else {
      await this.enterFullscreen();
    }
  },
};

export type ScreenService = typeof display;
