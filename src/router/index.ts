import { createRouter, createWebHashHistory } from 'vue-router'

const nbHome = () => import('@/pages/NbHome/index.vue')

const router = createRouter({
  // ...
  history: createWebHashHistory(),
  routes: [
    { path: '', redirect: '/home' },
    { path: '/home', component: nbHome },
    { path: '/:catchAll(.*)', redirect: '/home' }
  ]
})

export default router
