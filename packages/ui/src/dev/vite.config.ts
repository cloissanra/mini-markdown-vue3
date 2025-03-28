import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname),
  resolve: {
    alias: {
      '@': resolve(__dirname, '..')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['vue']
  }
})