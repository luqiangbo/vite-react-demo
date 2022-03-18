import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    WindiCSS(),
    copy({
      targets: [
        { src: 'src/assets/images/**/*', dest: 'dist/public/images' }, // 执行拷贝
      ],
      hook: 'writeBundle',
    }),
  ],
  server: {
    port: 8080,
    hmr: true, // 热更新
    proxy: {
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/1798/',
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: { strictPort: true },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@c': resolve(__dirname, 'src/components'),
      '/images': 'src/assets/images',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 此处也可设置直角、边框色、字体大小等
          'primary-color': '#645AFF',
        },
      },
    },
  },
  build: {
    target: 'esnext',
    reportCompressedSize: false, // 取消计算文件大小，加快打包速度
    sourcemap: false,
    chunkSizeWarningLimit: 1024,
    assetsDir: 'static',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
