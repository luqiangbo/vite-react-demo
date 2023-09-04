import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import banner from 'vite-plugin-banner'
import dayjs from 'dayjs'
import tailwindcss from 'tailwindcss'

import pkg from './package.json'

export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  // const host =

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss('./tailwind.config.js'),
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
      visualizer(),
      banner(`/**\n * version: v${pkg.version}\n * time: ${dayjs().format('YYYY-MM-DD HH:mm')}\n */`),
    ],
    preview: { strictPort: true },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@c': resolve(__dirname, 'src/components'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {},
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
  }
})
