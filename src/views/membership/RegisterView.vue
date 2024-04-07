<template>
  <div class="membership">
    <div class="side-banner">
      <div class="side-banner__logo">&nbsp;</div>
      <h2 class="side-banner__text">AUDIFY</h2>
    </div>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
export default {
  name: 'LoginView',
  components: {
    RegisterForm
  }
}
</script>
