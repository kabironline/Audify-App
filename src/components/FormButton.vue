<template>
  <button @click.prevent="handleClick" class="form__button" type="{{ type }}">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    type: {
      type: String,
      default: 'submit'
    },
    text: {
      type: String,
      default: 'Submit'
    },
    onClick: {
      type: Function,
      default: () => {
        console.log('Default onClick function')
      }
    }
  },
  methods: {
    handleClick() {
      // Execute both default and custom onClick functions
      this.onClick()
      if (this.type === 'submit') {
        // Emit 'submit' event for parent component handling
        this.$emit('submit')
      }
    }
  }
}
</script>