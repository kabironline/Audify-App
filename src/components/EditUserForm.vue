<template>
  <div class="form__container">
    <h2 class="heading-2 form__heading">Edit Profile</h2>
    <form class="form__box" @submit.prevent="submit" method="post" enctype="multipart/form-data">
      <div class="avatar-container avatar-container--editable" @click="openFileSelector">
        <input
          type="file"
          style="display: none"
          name="avatar"
          id="avatar"
          accept="image/png"
          @change="displaySelectedImage"
        />
        <label for="avatar" class="avatar-label">
          <img :src="current_user.avatar" alt="avatar" class="avatar-img" id="currentAvatar" />
        </label>
        <span class="avatar-edit" @click="openFileSelector"
          ><i class="fas fa-pen"></i> Edit Avatar</span
        >
      </div>

      <div class="form__group">
        <input
          type="text"
          minlength="2"
          maxlength="20"
          name="nickname"
          id="nickname"
          v-model="current_user.nickname"
          placeholder="Nickname"
          class="form__input"
        />
        <label for="nickname" class="form__label">Nickname</label>
      </div>
      <br />
      <div class="form__group">
        <textarea
          name="bio"
          maxlength="200"
          id="bio"
          v-model="current_user.bio"
          cols="30"
          rows="10"
          class="form__input form__input--textarea"
          placeholder="Bio (Optional)"
        />
        <label for="bio" class="form__label">Bio (Optional, 200 characters maximum) </label>
      </div>
      <br />
      <div class="form__group">
        <input
          type="password"
          minlength="8"
          name="password"
          id="password"
          v-model="current_user.password"
          placeholder="Password"
          class="form__input form__input--password"
          required
        />
        <label for="password" class="form__label">Password</label>
      </div>
      <br />
      <div class="form__group">
        <input
          pattern="[a-zA-Z0-9%\_$\-@]{6,}"
          type="password"
          minlength="8"
          name="new_password"
          id="new_password"
          v-model="current_user.new_password"
          placeholder="New Password"
          class="form__input form__input--password"
        />
        <label for="new_password" class="form__label">New Password</label>
      </div>
      <br />
      <input type="submit" value="Edit" class="form__button" />
      <br />
      <p class="form__error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'

export default {
  name: 'EditUserForm',
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  data: () => ({
    current_user: {
      nickname: 'John Doe',
      username: 'johndoe',
      bio: 'I am a music lover',
      password: 'password',
      new_password: '',
    },
    selectedAvatar: null,
    error: ''
  }),
  methods: {
    async submit() {
      const formData = new FormData()
      formData.append('nickname', this.current_user.nickname)
      formData.append('bio', this.current_user.bio)
      formData.append('password', this.current_user.password)
      formData.append('new_password', this.current_user.new_password)
      if (this.selectedAvatar) formData.append('avatar', this.selectedAvatar)
      this.error = await updateUser(formData)
    },
    openFileSelector() {
      document.getElementById('fileInput').click() // Trigger click on the hidden file input
    },
    displaySelectedImage(event) {
      const file = event.target.files[0] // Get the selected file
      if (file && file.type === 'image/png') {
        const reader = new FileReader() // Create a FileReader object
        this.selectedAvatar = file
        reader.onload = function () {
          const newAvatar = document.getElementById('currentAvatar')
          newAvatar.src = reader.result // Display the selected image
        }
        reader.readAsDataURL(file) // Read the file as a data URL
      } else {
        alert('Please select a PNG image file.')
      }
    }
  },
  created() {
    this.current_user = this.user
  }
}
</script>

<style>
.avatar-container--editable {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
  width: 100%;
  &:hover {
    cursor: pointer;

    .avatar-img {
      filter: blur(5px) brightness(0.5);
    }

    .avatar-edit {
      display: block;
      transform: translate(-50%, -50%) scale(1);
    }
  }
}

.avatar-img {
  border-radius: 50%;
  height: 20rem;
  width: 20rem;
  object-fit: cover;
  transition: all 0.1s ease-in-out;
  position: relative;
}

.avatar-edit {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  transition: all 0.2s ease-in-out;
}

.avatar-label {
  height: 20rem;
  width: 20rem;
}

.form__container {
  padding: 0;
}
</style>
