<template>
  <v-btn @click.prevent="navigate" :color="color" rounded="xl" elevation="0" class="btn d-flex">
    <span class="material-symbols-rounded" v-if="icon != ''">{{ icon }}</span>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'BtnNavigation',
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'Button'
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    navigate() {
      this.$router.push(this.to)
    }
  }
}
</script>

<style></style>
