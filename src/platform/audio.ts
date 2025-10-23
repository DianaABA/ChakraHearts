/**
 * Cross-platform audio service. Current implementation is web-only.
 * For React Native, provide an alternative implementation in the future.
 */

let loopAudio: HTMLAudioElement | null = null;

export const audio = {
  /** Play a looping track from a URL. Subsequent calls replace the current loop. */
  async playLoop(url: string, opts?: { volume?: number }) {
    try {
      // Stop existing
      if (loopAudio) {
        try {
          loopAudio.pause();
          loopAudio.currentTime = 0;
        } catch (e) {
          // ignore
        }
        loopAudio = null;
      }
      const a = new Audio(url);
      a.loop = true;
      a.volume = opts?.volume ?? 0.3;
      // set handlers to null on end/error
      a.onerror = () => {
        loopAudio = null;
      };
      a.onended = () => {
        loopAudio = null;
      };
      await a.play().catch(() => {
        // Autoplay may be blocked; keep reference so a later user interaction (play) can pick up
      });
      loopAudio = a;
    } catch {
      // no-op
    }
  },

  /** Stop the current looping track if any. */
  stopLoop() {
    if (loopAudio) {
      try {
        loopAudio.pause();
        loopAudio.currentTime = 0;
      } catch (e) {
        // ignore
      }
      loopAudio = null;
    }
  },

  /** Play a one-shot sound from a URL. */
  playOneShot(url: string, opts?: { volume?: number }) {
    try {
      const a = new Audio(url);
      a.volume = opts?.volume ?? 0.5;
      a.play().catch(() => {
        /* ignore */
      });
    } catch (e) {
      // ignore
    }
  },

  /** Stop all audio elements on the page. */
  stopAll() {
    try {
      const nodes = document.querySelectorAll("audio");
      nodes.forEach((n) => {
        try {
          n.pause();
          (n as HTMLAudioElement).currentTime = 0;
        } catch (e) {
          // ignore
        }
      });
    } catch (e) {
      // ignore
    }
    // Also stop our loop if not captured above
    if (loopAudio) {
      try {
        loopAudio.pause();
        loopAudio.currentTime = 0;
      } catch (e) {
        // ignore
      }
      loopAudio = null;
    }
  },
};

export type AudioService = typeof audio;
