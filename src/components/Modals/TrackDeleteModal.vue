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
        <p class="heading-4">Delete Track</p>
      </v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete this Track? This action cannot be undone.</p>
      </v-card-text>
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="primary" />
        <BtnAction text="Delete Track" @click="deleteTrackHandler" color="white" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import BtnAction from '../BtnAction.vue'
import { deleteTrack } from '@/api/track'
export default {
  name: 'DeleteTrackModal',
  emits: ['toggleVisible', 'deleteTrack'],
  props: {
    visible: {
      type: Boolean
    },
    trackId: {
      type: Number
    }
  },
  computed: {
    dialog() {
      return this.visible
    }
  },
  methods: {
    async deleteTrackHandler() {
      await deleteTrack(this.trackId)
      this.$emit('deleteTrack', this.trackId)
      this.updateVisible(false)
    },
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    }
  },
  components: { BtnAction }
}
</script>
