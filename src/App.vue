<template>
  <v-app>
    <RouterView v-slot="{ Component }">
      <Navbar v-if="headerFooterShown" />
      <v-main>
        <!-- <Transition name="fade" mode="out-in"> -->
        <component :is="Component" />
        <!-- </Transition> -->
      </v-main>
    </RouterView>
  </v-app>
</template>

<script>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    RouterView,
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

<!-- TODO: Add CSS transition -->
<!-- <style>
.fade-enter-from {
}

.fade-enter-active {
}

.fade-leave-to {
}
</style> -->
