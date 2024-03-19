<template>
  <v-dialog v-model="dialog" max-width="450">
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
        <p class="heading-4">Edit Playlist</p>
      </v-card-title>
      <br />
      <form action="/playlist" method="POST">
        <div class="form__group">
          <input
            type="text"
            minlength="2"
            maxlength="20"
            name="name"
            id="name"
            placeholder="Playlist Name"
            class="form__input"
            v-model="input.playlist_name"
            required
          />
          <label for="name" class="form__label">Playlist Name</label>
        </div>
        <br />
        <div class="form__group">
          <textarea
            name="description"
            maxlength="400"
            id="description"
            cols="30"
            rows="10"
            v-model="input.playlist_description"
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
        <BtnAction text="Edit Playlist" @click="update" color="primary" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { updatePlaylist } from '@/api/playlist'
import BtnAction from '../BtnAction.vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'PlaylistEditModal',
  emits: ['toggleVisible', 'updatePlaylist'],
  data: () => ({
    input: {
      playlist_name: '',
      playlist_description: ''
    }
  }),
  props: {
    visible: {
      type: Boolean
    },
    playlist: {
      type: Object,
      default: () => ({
        name: '',
        description: ''
      })
    }
  },
  computed: {
    dialog() {
      return this.visible
    }
  },
  methods: {
    async update() {
      const playlist = await updatePlaylist(this.playlist.id, this.input)
      useUserStore().updatePlaylist(playlist)
      this.$emit('updatePlaylist', playlist)
    },
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    }
  },
  components: { BtnAction },
  mounted() {
    this.input.playlist_name = this.playlist.name
    this.input.playlist_description = this.playlist.description
  }
}
</script>
