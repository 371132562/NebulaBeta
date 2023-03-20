import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import progress from 'vite-plugin-progress'
import colors from 'picocolors'
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
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
