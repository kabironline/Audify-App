<template>
  <v-btn
    icon
    @click.prevent="action"
    rounded="xl"
    size="small"
    color="transparent"
    elevation="0"
    class="btn d-flex justify-center align-center"
  >
    <span
      class="material-symbols-rounded"
      v-if="icon != ''"
      :style="{
        fontSize: `${iconSize}rem`,
        color: color
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
      default: 'white'
    },
    iconSize: {
      type: Number,
      default: 2
    }
  }
}
</script>
