<template>
  <div class="membership">
    <div class="side-banner">
      <div class="side-banner__logo">&nbsp;</div>
      <h2 class="side-banner__text">AUDIFY</h2>
    </div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
}
</script>
