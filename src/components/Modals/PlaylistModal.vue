<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <v-card
      style="
        background-color: transparent;
        backdrop-filter: blur(20px) brightness(0.5);
        border: 1px solid white;
        border-radius: 1rem;
        padding: 2rem;
      "
    >
      <v-card-title>
        <p class="heading-4">Create Playlist</p>
      </v-card-title>
      <form @submit.prevent="onSubmit">
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
            v-model="data.playlist_name"
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
            v-model="data.playlist_description"
            class="form__input form__input--textarea"
            placeholder="Description (Optional)"
          />
          <label for="description" class="form__label"
            >Description (Optional, 400 characters maximum)
          </label>
        </div>
      </form>
      <br />
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="white" />
        <BtnAction text="Create" @click="onSubmit" color="primary" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import BtnAction from '../BtnAction.vue'
import { createPlaylist } from '@/helper/setters'
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia'
export default {
  name: 'PlaylistModal',
  emits: ['toggleVisible'],
  props: {
    visible: {
      type: Boolean
    }
  },
  data: () => ({
    data: {
      playlist_name: '',
      playlist_description: ''
    }
  }),
  computed: {
    dialog() {
      return this.visible
    }
  },
  methods: {
    ...mapActions(useUserStore, ['addPlaylist']),
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    },
    async onSubmit() {
      const playlist = await createPlaylist(this.data)
      if (playlist) {
        this.addPlaylist(playlist)
        this.updateVisible(false)
      }
    }
  },
  components: { BtnAction }
}
</script>
