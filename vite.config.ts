// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
export default defineConfig({
  plugins: [vue()],
  // 设置路径别名
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ]
  }
});
