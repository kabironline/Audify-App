<template>
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
            :src="channelAvatar(channel.id)"
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
</template>

<script>
import { channelAvatar } from '@/utils/http'
export default {
  name: 'EditChannelForm',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    channelData: {
      name: 'Jhon Denver Official',
      description: 'This is the official account of Jhon Denver'
    }
  }),
  methods: {
    channelAvatar,
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
  }
}
</script>

<style>
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
</style>
