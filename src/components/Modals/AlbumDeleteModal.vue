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
        <p class="heading-4">Delete Album</p>
      </v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete this Album? This action cannot be undone.</p>
      </v-card-text>
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="primary" />
        <BtnAction text="Delete Album" @click="deleteAlbum" color="white" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { deleteAlbum } from '@/api/album'
import BtnAction from '../BtnAction.vue'

export default {
  name: 'DeleteAlbumModal',
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
    async deleteAlbum() {
      const result = await deleteAlbum(this.$route.params.id)
      if (result) {
        this.updateVisible(false)
        this.$router.go(-1)
      }
    },
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    }
  },
  components: { BtnAction }
}
</script>
