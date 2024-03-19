<template>
  <section class="section section-edit-profile">
    <div class="form__container">
      <h2 class="heading-2 form__heading">Register Channel</h2>
      <form class="form__box" enctype="multipart/form-data">
        <div class="avatar-container avatar-container--editable">
          <input
            type="file"
            style="display: none"
            name="avatar"
            id="avatar"
            accept="image/png"
            @change="displaySelectedImage"
          />
          <label for="avatar" class="avatar-label">
            <img
              src="https://via.placeholder.com/300"
              alt="avatar"
              class="avatar-img"
              id="currentAvatar"
            />
            <span class="avatar-edit"><i class="fas fa-pen"></i> Edit Avatar</span>
          </label>
        </div>
        <div class="form__group">
          <input
            type="text"
            minlength="2"
            maxlength="20"
            name="name"
            v-model="channel.name"
            id="name"
            placeholder="Channel Name"
            class="form__input"
          />
          <label for="name" class="form__label">Channel Name</label>
        </div>
        <br />
        <div class="form__group">
          <textarea
            name="description"
            maxlength="400"
            v-model="channel.bio"
            id="description"
            cols="30"
            rows="10"
            class="form__input form__input--textarea"
            placeholder="Description (Optional)"
          />
          <label for="description" class="form__label"
            >Description (Optional, 400 characters maximum)
          </label>
        </div>
        <br />
        <div class="form__group">
          <input
            type="password"
            minlength="8"
            name="password"
            id="password"
            v-model="channel.password"
            placeholder="Password"
            class="form__input form__input--password"
            required
          />
          <label for="password" class="form__label">Password</label>
        </div>
        <br />
        <!-- <input type="submit" value="Create" class="form__button" /> -->
        <v-btn @click="submit" color="primary" class="form__button">Create</v-btn>
        <br />
        <p class="form__error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import { createChannel } from '@/api/channel'
import { useUserStore } from '@/stores/user'

export default {
  name: 'RegisterChannelView',
  data: () => ({
    channel: {
      name: '',
      bio: '',
      password: ''
    },
    avatar: null,
    error: ''
  }),
  methods: {
    async submit() {
      if (this.channel.avatar === null) {
        this.error = 'Please select an avatar.'
        return
      }

      const formData = new FormData()
      formData.append('avatar', document.getElementById('avatar').files[0])
      formData.append('name', this.channel.name)
      formData.append('bio', this.channel.bio)
      formData.append('password', this.channel.password)

      const response = await createChannel(formData)
      if (response === '') {
        this.$router.push('/')
      } else {
        this.error = response
      }
    },
    displaySelectedImage(event) {
      const file = event.target.files[0] // Get the selected file
      if (file && file.type === 'image/png') {
        const reader = new FileReader() // Create a FileReader object
        reader.onload = function () {
          const newAvatar = document.getElementById('currentAvatar')
          this.avatar = file
          newAvatar.src = reader.result // Display the selected image
        }
        reader.readAsDataURL(file) // Read the file as a data URL
      } else {
        alert('Please select a PNG image file.')
      }
    }
  },
  mounted() {
    if (useUserStore().getUserChannel) {
      this.$router.push(`/channel/${useUserStore().getUserChannel.id}/dashboard`)
    }
  }
}
</script>

<style>
.section-edit-profile {
  display: grid;
  grid-template-columns: 50rem 1fr;
  gap: 2rem;
}

.avatar-section {
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 4rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border-light);
  box-shadow: 0 0 100px -29px var(--color-border-light);
  height: 75%;
}

.avatar-container {
  position: relative;
  width: fit-content;
  align-self: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.avatar-container--editable {
  /* display: flex;
  justify-content: center;
  align-items: center; */
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
}

.avatar-edit {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  transition: all 0.2s ease-in-out;
}

.form__container {
  padding: 0;
}

.page-content {
  padding-bottom: 0;
}
</style>
