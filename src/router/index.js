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
    },
    {
      path: '/genre/:genre/tracks',
      name: 'genre-tracks',
      props: { tracks: [], heading: 'Rock Tracks' },
      component: () => import('../views/music/AllTracksView.vue')
    },
    {
      path: '/new-releases',
      name: 'new-releases',
      component: () => import('../views/music/AllTracksView.vue'),
      props: { tracks: [], heading: 'New Releases' }
    },
    {
      path: '/top',
      name: 'top',
      component: () => import('../views/music/TopChartsView.vue')
    },
    {
      path: '/top/tracks',
      name: 'top-tracks',
      component: () => import('../views/music/AllTracksView.vue'),
      props: { tracks: [], heading: 'Top Tracks' }
    },
    {
      path: '/top/albums',
      name: 'top-albums',
      component: () => import('../views/music/AllAlbumsView.vue'),
      props: { albums: [] }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/music/DashboardUserView.vue')
    }
  ]
})

export default router
