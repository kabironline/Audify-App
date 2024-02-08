<template>
  <v-app>
    <div class="page-container">
      <Sidebar v-if="headerFooterShown" />
      <div class="page-content">
        <!-- Insert Navbar here -->
        <Navbar v-if="headerFooterShown" />
        <div class="container">
          <RouterView v-slot="{ Component }">
            <!-- <Transition name="fade" mode="out-in"> -->
            <component :is="Component" />
            <!-- </Transition> -->
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
export default {
  components: {
    RouterView,
    Sidebar,
    Navbar,
    PlayerBar
  },
  computed: {
    headerFooterShown() {
      console.log(this.$route.name)
      return this.$route.name !== 'login' && this.$route.name !== 'register'
    }
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
  transition: all 0.2s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
