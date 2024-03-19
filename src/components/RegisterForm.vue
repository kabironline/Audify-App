<template>
  <div class="form__container">
    <form class="form__box" @submit.prevent="onSubmit">
      <h2 class="form__heading">Sign Up</h2>
      <div class="form__group">
        <input
          type="text"
          minlength="6"
          maxlength="20"
          name="username"
          id="username"
          placeholder="Username"
          class="form__input"
          v-model="form.username"
          required
        />
        <label for="username" class="form__label">Username</label>
      </div>
      <br />
      <div class="form__group">
        <input
          type="text"
          minlength="2"
          maxlength="20"
          name="nickname"
          id="nickname"
          placeholder="Nickname (Optional)"
          v-model="form.nickname"
          class="form__input"
        />
        <label for="nickname" class="form__label">Nickname (Optional)</label>
      </div>
      <br />
      <div class="form__group">
        <textarea
          maxlength="200"
          name="bio"
          id="bio"
          cols="30"
          rows="10"
          class="form__input form__input--textarea"
          v-model="form.bio"
          placeholder="Bio (Optional)"
        ></textarea>
        <label for="bio" class="form__label">Bio (Optional, 200 characters maximum) </label>
      </div>
      <br />
      <div class="form__group">
        <input
          type="password"
          minlength="8"
          name="password"
          id="password"
          placeholder="Password"
          v-model="form.password"
          class="form__input form__input--password"
          required
        />
        <label for="password" class="form__label">Password</label>
      </div>
      <h3 class="form__alternative">
        <span class="form__alternative--text"> Already have an account? </span>
        <span @click.prevent="this.$router.push('/login')" class="form__alternative--link"
          >Log In!</span
        >
      </h3>
      <p class="form__error">{{ error }}</p>
      <button class="form__button" type="type" :disabled="isDisabled">Submit</button>
    </form>
  </div>
</template>

<script>
import { post } from '@/utils/http'
export default {
  name: 'LoginForm',
  components: {},
  data() {
    return {
      error: '',
      isDisabled: false,
      form: {
        username: '',
        nickname: '',
        bio: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      const response = await post('/user', this.form)
      if (response.status === 201) {
        this.$router.push('/login')
      } else {
        const data = await response.json()
        this.error = data.error
      }
    }
  }
}
</script>
