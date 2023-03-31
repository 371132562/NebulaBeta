import { createRouter, createWebHashHistory } from 'vue-router'

const nbHome = () => import('@/pages/NbHome/index.vue')
const nbDetail = () => import('@/pages/NbDetail/index.vue')
const nbBattle = () => import('@/pages/NbBattle/index.vue')
const nbAbout = () => import('@/pages/NbAbout/index.vue')

const router = createRouter({
  // ...
  history: createWebHashHistory(),
  routes: [
    { path: '', redirect: '/home' },
    { path: '/home', component: nbHome },
    { path: '/detail', component: nbDetail },
    { path: '/battle', component: nbBattle },
    { path: '/about', component: nbAbout },
    { path: '/:catchAll(.*)', redirect: '/home' }
  ]
})

export default router
