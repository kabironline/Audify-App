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
        <p class="heading-4">Delete Channel</p>
      </v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete your own Channel? This action cannot be undone.</p>
      </v-card-text>
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="primary" />
        <BtnAction text="Delete Channel" @click="deleteHanlder" color="white" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { deleteChannel } from '@/api/channel'
import BtnAction from '../BtnAction.vue'

export default {
  name: 'DeleteChannelModal',
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
    async deleteHanlder() {
      const response = await deleteChannel()

      if (response === '') {
        this.updateVisible(false)
        this.$router.push('/')
      }
    },
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    }
  },
  components: { BtnAction }
}
</script>
