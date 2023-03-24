import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'normalize.css'

import './styles/style.scss'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
