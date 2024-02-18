<template>
  <section class="section section-edit-profile">
    <div class="avatar-section">
      <h3 class="heading-3">Current Profile</h3>
      <br />
      <div class="avatar-container">
        <img src="https://via.placeholder.com/300" alt="Avatar" class="avatar-img" />
      </div>
      <h3 class="heading-3 avatar--title">{{ current_user.nickname }}</h3>
      <h4 class="heading-4 avatar--subtitle">{{ current_user.username }}</h4>
      <p class="avatar-desc">
        {{ current_user.bio }}
      </p>
      <BtnAction
        color="dark"
        text="Delete Account"
        icon="delete"
        @click="deleteModalVisible = true"
      />
      <UserDeleteModal :visible="deleteModalVisible" @toggleVisible="deleteModalVisible = false" />
    </div>
    <div class="form__container">
      <h2 class="heading-2 form__heading">Edit Profile</h2>
      <form class="form__box" action="/edit_profile" method="post" enctype="multipart/form-data">
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
            :value="current_user.nickname"
            name="nickname"
            id="nickname"
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
            :value="current_user.bio"
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
  </section>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import UserDeleteModal from '@/components/Modals/UserDeleteModal.vue'

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
    current_user: {
      nickname: 'John Doe',
      username: 'johndoe',
      bio: 'I am a music lover'
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
  components: { BtnAction, UserDeleteModal }
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
