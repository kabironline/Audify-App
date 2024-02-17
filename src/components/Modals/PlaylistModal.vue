<template>
  <v-dialog v-model="dialog" max-width="450">
    <v-card
      style="
        background-color: transparent;
        backdrop-filter: blur(20px) brightness(0.5);
        border: 1px solid white;
        border-radius: 1rem;
        padding: 1rem;
      "
    >
      <!-- <v-card-title> -->
      <p class="heading-4 p-5">Create Playlist</p>
      <!-- </v-card-title> -->
      <form action="/playlist" method="POST">
        <div class="form__group">
          <input
            type="text"
            minlength="2"
            maxlength="20"
            value=""
            name="name"
            id="name"
            placeholder="Playlist Name"
            class="form__input"
            required
          />
          <label for="name" class="form__label">Playlist Name</label>
        </div>
        <br />
        <div class="form__group">
          <textarea
            name="description"
            maxlength="400"
            value=""
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
      </form>
      <br />
      <!-- <v-card-actions> -->
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="white" />
        <BtnAction text="Create" @click="logout" color="primary" />
      </div>
      <!-- </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import BtnAction from '../BtnAction.vue'

export default {
  name: 'PlaylistModal',
  emits: ['toggleVisible'],
  props: {
    visible: {
      type: Boolean
    }
  },
  computed: {
    dialog() {
      return this.visible
    }
  },
  methods: {
    logout() {
      console.log('Logging out...')
    },
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    }
  },
  components: { BtnAction }
}
</script>
