import { createRouter, createWebHashHistory } from 'vue-router'

const nbHome = () => import('@/pages/nbHome/index.vue')

const router = createRouter({
  // ...
  history: createWebHashHistory(),
  routes: [{ path: '/home', component: nbHome }]
})

export default router
