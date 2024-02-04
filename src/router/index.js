import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/membership/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/membership/RegisterView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('../views/music/ExploreView.vue')
    }
  ]
})

export default router
