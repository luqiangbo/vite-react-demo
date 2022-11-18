import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'
import copy from 'rollup-plugin-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import banner from 'vite-plugin-banner'
import dayjs from 'dayjs'
import postcsspxtoviewport from 'postcss-px-to-viewport'

import pkg from './package.json'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  let host = ''

  if (env.MODE === 'dev') {
    host = 'http://rap2api.taobao.org/app/mock/1798/'
  } else if (env.MODE === 'prod') {
    host = 'http://rap2api.taobao.org/app/mock/1798/'
  }

  return {
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
      visualizer(),
      banner(`/**\n * version: v${pkg.version}\n * time: ${dayjs().format('YYYY-MM-DD HH:mm')}\n */`),
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
        less: {},
      },
      postcss: {
        plugins: [
          // postcsspxtoviewport({
          //   unitToConvert: 'px', // 要转化的单位
          //   viewportWidth: 750, // UI设计稿的宽度
          //   unitPrecision: 6, // 转换后的精度，即小数点位数
          //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          //   fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          //   selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          //   replace: true, // 是否转换后直接更换属性值
          //   // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          //   exclude: [],
          //   // include: [/\/src\/pages\/_h5\//],
          //   landscape: false, // 是否处理横屏情况
          // }),
        ],
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
