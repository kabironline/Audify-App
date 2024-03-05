import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

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
      path: '/register_channel',
      name: 'register-channel',
      component: () => import('../views/membership/RegisterChannelView.vue')
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
      path: '/genre/:genreId/tracks',
      name: 'genre-tracks',
      props: { heading: 'Rock Tracks' },
      component: () => import('../views/music/AllTracksView.vue')
    },
    {
      path: '/new-releases',
      name: 'new-releases',
      component: () => import('../views/music/AllTracksView.vue'),
      props: { tracks: [], heading: 'New Releases' }
    },
    {
      path: '/top/tracks',
      name: 'top-tracks',
      component: () => import('../views/music/AllTracksView.vue'),
      props: { tracks: [], heading: 'Top Tracks' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/music/DashboardUserView.vue')
    },
    {
      path: '/channel/dashboard/:channelId',
      name: 'channel-dashboard',
      component: () => import('../views/music/DashboardChannelView.vue')
    },
    {
      path: '/channel/dashboard/tracks',
      name: 'channel-dashboard-tracks',
      component: () => import('../views/music/AllTracksView.vue'),
      props: { tracks: [], heading: 'Channel Tracks' }
    },
    {
      path: '/channel/dashboard/albums',
      name: 'channel-dashboard-albums',
      component: () => import('../views/music/AllAlbumsView.vue'),
      props: { albums: [], heading: 'Channel Albums' }
    },
    {
      path: '/edit_profile',
      name: 'edit-profile',
      component: () => import('../views/membership/EditProfileView.vue')
    },
    {
      path: '/channel/edit_profile',
      name: 'channel-edit-profile',
      component: () => import('../views/membership/EditChannelProfileView.vue')
    },
    {
      path: '/upload',
      name: 'track-upload',
      component: () => import('../views/music/UploadView.vue')
    },
    {
      path: '/album/create',
      name: 'album-create',
      component: () => import('../views/music/AlbumCreateView.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('../views/music/PlaylistView.vue')
    },
    {
      path: '/album',
      name: 'album',
      component: () => import('../views/music/AlbumView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  try {
    userStore.isLoggedIn
  } catch (error) {
    return '/login'
  }
  if (!userStore.isLoggedIn && !(to.name === 'login' || to.name === 'register')) {
    return '/login'
  }
})

export default router
