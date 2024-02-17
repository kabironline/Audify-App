<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card
      style="
        background-color: transparent;
        backdrop-filter: blur(20px) brightness(0.5);
        border: 1px solid white;
        border-radius: 1rem;
        padding: 1rem;
      "
    >
      <v-card-title>
        <p class="heading-4">Logout</p>
      </v-card-title>
      <v-card-text>
        <p>Are you sure you want to logout?</p>
      </v-card-text>
      <!-- <v-card-actions> -->
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="primary" />
        <BtnAction text="Logout" @click="logout" color="white" />
      </div>
      <!-- </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import BtnAction from '../BtnAction.vue'

export default {
  name: 'LogoutModal',
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

<style></style>
