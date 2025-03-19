import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MiniMarkdownCore",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["marked", "highlight.js"],
      output: {
        globals: {
          marked: "marked",
          "highlight.js": "hljs",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
