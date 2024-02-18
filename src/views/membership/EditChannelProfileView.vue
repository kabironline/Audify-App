<template>
  <section class="section section-edit-profile">
    <div class="avatar-section">
      <h3 class="heading-3">Current Profile</h3>
      <br />
      <div class="avatar-container">
        <img src="https://via.placeholder.com/340" alt="Avatar" class="avatar-img" />
      </div>
      <h3 class="heading-3 avatar--title">{{ channel.name }}</h3>
      <p class="avatar-desc">
        {{ channel.description }}
      </p>
      <BtnAction
        color="dark"
        text="Delete Account"
        icon="delete"
        @click.prevent="deleteModalVisible = true"
      />
      <ChannelDeleteModal
        :visible="deleteModalVisible"
        @toggleVisible="deleteModalVisible = false"
      />
    </div>
    <div class="form__container">
      <h2 class="heading-2 form__heading">Edit Profile</h2>
      <form
        class="form__box"
        action="/edit_profile_creator"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="avatar-container avatar-container--editable">
          <input
            type="file"
            style="display: none"
            name="avatar"
            id="avatar"
            accept="image/png"
            @change="displaySelectedImage"
          />
          <label for="avatar" class="avatar-label" @click="openFileSelector">
            <img
              src="https://via.placeholder.com/340"
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
            :value="channel.name"
            name="name"
            id="name"
            placeholder="Channel Name"
            class="form__input"
          />
          <label for="nickname" class="form__label">Channel Name</label>
        </div>
        <br />
        <div class="form__group">
          <textarea
            name="description"
            maxlength="200"
            id="description"
            cols="30"
            rows="10"
            :value="channel.description"
            class="form__input form__input--textarea"
            placeholder="Description (Optional)"
          />
          <label for="description" class="form__label"
            >Description (Optional, 200 characters maximum)
          </label>
        </div>
        <br />
        <div class="form__group">
          <input
            type="password"
            minlength="8"
            name="password"
            id="password"
            placeholder="Password"
            class="form__input form__input--password"
            required
          />
          <label for="password" class="form__label">Password</label>
        </div>
        <br />
        <input type="submit" value="Edit" class="form__button" />
        <br />
      </form>
    </div>
  </section>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import ChannelDeleteModal from '@/components/Modals/ChannelDeleteModal.vue'

export default {
  name: 'EditProfileView',
  data: () => ({
    deleteModalVisible: false,
    form: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    channel: {
      name: 'Jhon Denver Official',
      description: 'This is the official account of Jhon Denver'
    },
    error: ''
  }),
  methods: {
    submit() {
      console.log('Submitting form')
    },
    openFileSelector() {
      document.getElementById('fileInput').click() // Trigger click on the hidden file input
    },
    displaySelectedImage(event) {
      const file = event.target.files[0] // Get the selected file
      if (file && file.type === 'image/png') {
        const reader = new FileReader() // Create a FileReader object
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
  components: { BtnAction, ChannelDeleteModal }
}
</script>

<style scoped>
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

.btn {
  align-self: flex-start;
}
</style>
