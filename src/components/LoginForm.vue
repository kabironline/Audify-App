<template>
  <div class="form__container">
    <form class="form__box" @submit.prevent="onSubmit">
      <h2 class="form__heading heading-2">Sign In</h2>
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
        <span @click.prevent="this.$router.push('/register')" class="form__alternative--link"
          >Register!</span
        >
      </h3>
      <p class="form__error">{{ error }}</p>
      <button class="form__button" type="type" :disabled="isDisabled">Submit</button>
    </form>
  </div>
</template>

<script>
import router from '@/router'
import { post } from '@/utils/http'
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia'
export default {
  name: 'LoginForm',
  components: {},
  data() {
    return {
      error: '',
      form: {
        username: '',
        password: ''
      },
      isDisabled: false
    }
  },
  setup() {
    const store = useUserStore()

    return { store }
  },
  methods: {
    ...mapActions(useUserStore, ['setUser', 'setToken']),
    async onSubmit() {
      const response = await post('/login', this.form)
      if (response.status === 200) {
        const json = await response.json()
        localStorage.setItem('token', json.access_token)
        localStorage.setItem('user', JSON.stringify(json.user))
        this.setUser(json.user)
        this.setToken(json.access_token)

        router.push('/')
      } else {
        const json = await response.json()
        this.error = json.error
      }
    }
  }
}
</script>
