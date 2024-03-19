<template>
  <v-dialog v-model="dialog" max-width="500">
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
        <p class="heading-4">Delete Playlist</p>
      </v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete this Playlist? This action cannot be undone.</p>
      </v-card-text>
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="primary" />
        <BtnAction text="Delete Playlist" @click="deletePlaylist" color="white" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { deletePlaylist } from '@/api/playlist'
import { useUserStore } from '@/stores/user'
import BtnAction from '../BtnAction.vue'
export default {
  name: 'DeletePlaylistModal',
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
    async deletePlaylist() {
      const response = await deletePlaylist(this.$route.params.id)
      if (response) {
        const store = useUserStore()
        store.removePlaylist(this.$route.params.id)
        this.$router.push('/')
        this.updateVisible(false)
      }
    },
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    }
  },
  components: { BtnAction }
}
</script>
