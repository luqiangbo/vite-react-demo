import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'
import copy from 'rollup-plugin-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const host = 'http://rap2api.taobao.org/app/mock/1798/'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    WindiCSS(),
    copy({
      targets: [
        { src: 'src/assets/public/**/*', dest: 'dist/public' }, // 执行拷贝
      ],
      hook: 'writeBundle',
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
    }),
  ],
  server: {
    port: 7001,
    hmr: true, // 热更新
    proxy: {
      '/apis': {
        target: host,
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ''),
      },
    },
  },
  preview: { strictPort: true },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@c': resolve(__dirname, 'src/components'),
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
