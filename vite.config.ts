import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import progress from 'vite-plugin-progress'
import colors from 'picocolors'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        // 自动导入图标组件
        IconsResolver({
          prefix: 'icon'
        }),
        ElementPlusResolver()
      ]
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ]
    }),
    Icons({
      compiler: 'vue3', // 编译方式
      autoInstall: true
    }),
    progress({
      format: `:percent${colors.green(' [:bar]')} | ${colors.bold(
        colors.cyan('Transforms：')
      )}:transformCur/:transformTotal | ${colors.bold(
        colors.cyan('Chunks：')
      )}:chunkCur/:chunkTotal | ${colors.bold(colors.cyan('Time：'))}:elapsed`
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': '/src'
    }
  }
})
