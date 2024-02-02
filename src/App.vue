<template>
  <v-app>
    <div class="page-container">
      <Sidebar v-if="headerFooterShown" />
      <div class="page-content">
        <!-- Insert Navbar here -->
        <RouterView v-slot="{ Component }">
          <!-- <Transition name="fade" mode="out-in"> -->

          <div class="container">
            <component :is="Component" />
          </div>
          <!-- </Transition> -->
        </RouterView>
      </div>
    </div>
  </v-app>
</template>

<script>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    RouterView,
    Sidebar,
    Navbar
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
}
</style>

<!-- TODO: Add CSS transition -->
<!-- <style>
.fade-enter-from {
}

.fade-enter-active {
}

.fade-leave-to {
}
</style> -->
