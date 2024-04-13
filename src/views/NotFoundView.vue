<template>
  <section class="not-found-sector sector">
    <div class="not-found-container">
      <h1 class="heading-1">404!</h1>
      <p class="error-message">Page not found</p>
      <br />
      <BtnNavigation text="Go Home" to="/" />
    </div>
  </section>
</template>

<script>
import BtnNavigation from '@/components/BtnNavigation.vue'
export default {
  components: {
    BtnNavigation
  },
  name: 'NotFoundView'
}
</script>

<style scoped>
.not-found-sector {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .not-found-container {
    text-align: center;

    .heading-1 {
      font-size: 30rem;
      margin-bottom: 1rem;
    }

    .error-message {
      font-size: 3rem;
    }
  }
}
</style>
