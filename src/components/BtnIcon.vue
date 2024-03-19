<template>
  <v-btn
    icon
    @click.prevent="action"
    rounded="xl"
    size="small"
    :variant="variant"
    :color="color"
    elevation="0"
    class="btn d-flex justify-center align-center"
    :disabled="isDisabled"
  >
    <span
      class="material-symbols-rounded"
      v-if="icon != ''"
      :style="{
        fontSize: `${iconSize}rem`,
        color: isDisabled ? 'var(--text-placeholder-color)' : color
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
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'text',
      required: false
    }
  }
}
</script>
