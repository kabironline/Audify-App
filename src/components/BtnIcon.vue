<template>
  <v-btn
    icon
    @click.prevent="action"
    :color="color"
    rounded="xl"
    size="small"
    elevation="0"
    class="btn d-flex justify-center align-center"
  >
    <span
      class="material-symbols-rounded"
      v-if="icon != ''"
      :style="{
        fontSize: `${iconSize}rem`
      }"
      >{{ icon }}</span
    >
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
      default: 'transparent'
    },
    iconSize: {
      type: Number,
      default: 2
    }
  }
}
</script>
