<template>
  <RouterView v-slot="{ Component }">
    <!-- <Transition name="fade" mode="out-in"> -->
    <component :is="Component" />
    <!-- </Transition> -->
  </RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  }
}
</script>

<!-- TODO: Add CSS transition -->
<style>
.fade-enter-from {
}

.fade-enter-active {
}

.fade-leave-to {
}
</style>
