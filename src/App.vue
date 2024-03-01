<template>
  <v-app>
    <div class="page-container">
      <Sidebar v-if="headerFooterShown" />
      <div class="page-content">
        <!-- Insert Navbar here -->
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
</template>

<script>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import PlayerBar from './components/PlayerBar.vue'

import { useUserStore } from './stores/user'
import { usePlayerStore } from './stores/player'

export default {
  components: {
    RouterView,
    Sidebar,
    Navbar,
    PlayerBar
  },
  computed: {
    headerFooterShown() {
      return this.$route.name !== 'login' && this.$route.name !== 'register'
    }
  },
  setup() {
    const store = useUserStore()
    store.initializeUserAtStart()

    const playerStore = usePlayerStore()
    playerStore.initializePlayerAtStart()
    return { store }
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
