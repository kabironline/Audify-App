<template>
  <v-btn @click.prevent="action" :color="color" rounded="xl" elevation="0" class="btn">
    <span class="material-symbols-rounded" v-if="icon != ''">{{ icon }}</span>
    <p>{{ text }}</p>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnAction',
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

<style>
.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: none;
  border-radius: 2rem;
  cursor: pointer;
}
</style>
