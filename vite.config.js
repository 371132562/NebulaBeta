import path from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import progress from 'vite-plugin-progress'
import colors from 'picocolors'

export default defineConfig({
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/ukamnads.icu': {
        target: 'https://ukamnads.icu',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/ukamnads.icu/, '')
      }
    }
  },
  build: {
    sourcemap: true
  },
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    }),
    progress({
      format: `:percent${colors.green(' :bar')} ${colors.bold(
        colors.cyan('Transforms:')
      )}:transformCur/:transformTotal|${colors.bold(
        colors.cyan('Chunks:')
      )}:chunkCur/:chunkTotal|${colors.bold(colors.cyan('Time:'))}:elapsed`,
      width: 50
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  }
})
