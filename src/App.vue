<template>
  <v-app v-if="storeInitialized">
    <div class="page-container">
      <PlaylistModal
        :visible="playlistModalVisible"
        @toggleVisible="playlistModalVisible = false"
      />
      <Sidebar v-if="headerFooterShown" />
      <div class="page-content">
        <Navbar v-if="headerFooterShown" />
        <div class="container">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.path" />
          </RouterView>
        </div>
        <PlayerBar v-if="headerFooterShown" />
      </div>
    </div>
  </v-app>
  <v-overlay v-else>
    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import PlayerBar from './components/PlayerBar.vue'
import PlaylistModal from './components/Modals/PlaylistModal.vue'
import { useUserStore } from './stores/user'
import { usePlayerStore } from './stores/player'
import { useModalStore } from './stores/modal'
import { onBeforeMount, ref } from 'vue'
export default {
  components: {
    RouterView,
    Sidebar,
    Navbar,
    PlayerBar,
    PlaylistModal
  },
  data: () => ({
    playlistModalVisible: false
  }),
  computed: {
    headerFooterShown() {
      return this.$route.name !== 'login' && this.$route.name !== 'register'
    }
  },
  setup() {
    const storeInitialized = ref(false)
    onBeforeMount(async () => {
      const store = useUserStore()
      store.initializeUserAtStart().then(() => {
        const playerStore = usePlayerStore()
        playerStore.initializePlayerAtStart()
        useModalStore()

        storeInitialized.value = true
      })
    })

    return { storeInitialized }
  }
}
</script>

<style>
.page-container {
  position: absolute;
  inset: 0;
  display: flex;
  overflow: hidden;
}

.page-content {
  width: 100%;
  overflow-y: auto;
}

.container {
  padding: 3rem 7rem;
  padding-bottom: 7rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
