import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MiniMarkdownUI",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["vue", "@mini-markdown/core", "highlight.js/styles/*.css", /\.test\.ts$/],
      output: {
        globals: {
          vue: "Vue",
          "@mini-markdown/core": "MiniMarkdownCore",
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
