<template>
  <div class="form__container">
    <form class="form__box" @submit.prevent="onSubmit">
      <h2 class="form__heading">Sign In</h2>
      <div class="form__group">
        <input
          type="text"
          minlength="6"
          maxlength="20"
          name="username"
          id="username"
          v-model="form.username"
          placeholder="Username"
          class="form__input"
          required
        />
        <label for="username" class="form__label">Username</label>
      </div>
      <br />
      <div class="form__group">
        <input
          type="password"
          minlength="8"
          name="password"
          id="password"
          v-model="form.password"
          placeholder="Password"
          class="form__input form__input--password"
          required
        />
        <label for="password" class="form__label">Password</label>
      </div>
      <h3 class="form__alternative">
        <span class="form__alternative--text"> Don't have an account? </span>
        <a href="/register" class="form__alternative--link">Register!</a>
      </h3>
      <p class="form__error">{{ error }}</p>
      <button class="form__button" type="type">Submit</button>
    </form>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'LoginForm',
  components: {},
  data() {
    return {
      error: '',
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      console.log('Form submitted')
      console.log(this.form)

      setTimeout(() => {
        router.push('/home')
      }, 300)
    }
  }
}
</script>
