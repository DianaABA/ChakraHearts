export const devLog = (...args: unknown[]) => {
  // Suppress in tests and production; only show during interactive dev
  if (import.meta.env.DEV && import.meta.env.MODE !== "test") {
    console.log(...args);
  }
};

export const devWarn = (...args: unknown[]) => {
  if (import.meta.env.DEV) console.warn(...args);
};
