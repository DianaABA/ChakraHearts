/** Cross-platform storage facade. Web uses localStorage; RN can use AsyncStorage later. */

export const storage = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // ignore
    }
  },
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // ignore
    }
  },
};

export type StorageService = typeof storage;
