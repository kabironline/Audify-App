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
        <p class="heading-4">Delete User</p>
      </v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete your own account? This action cannot be undone.</p>
      </v-card-text>
      <!-- <v-card-actions> -->
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="primary" />
        <BtnAction text="Delete User" @click="deleteUser" color="white" />
      </div>
      <!-- </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import BtnAction from '../BtnAction.vue'

export default {
  name: 'DeleteUserModal',
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
    deleteUser() {
      console.log('Deleting User...')
    },
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    }
  },
  components: { BtnAction }
}
</script>
