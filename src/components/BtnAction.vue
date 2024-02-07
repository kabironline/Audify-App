<template>
  <v-btn @click.prevent="action" :color="color" rounded="xl" elevation="0" class="btn d-flex">
    <span class="material-symbols-rounded" v-if="icon != ''">{{ icon }}</span>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'BtnNavigation',
  props: {
    action: {
      type: Function,
      default: () => {}
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
  }
}
</script>

<style></style>
