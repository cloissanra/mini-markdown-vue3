import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({
    include: ["src/**/*.ts"],
    outDir: "dist/types",
  })],
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
      external: ["marked", "highlight.js", /\.test\.ts$/],
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
