import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@stores": "/src/stores",
      "@assets": "/src/assets",
      "@types": "/src/types",
      "@utils": "/src/utils",
    },
  },
});
