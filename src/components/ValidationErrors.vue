<template>
  <ul class='error-messages'>
    <li v-for='errorMessage in errorMessages' :key='errorMessage'>
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationErrors() {
      return {
        type: Object,
        required: true
      }
    }
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(key => {
        const message = this.validationErrors[key].join(', ')
        return `${key} ${message}`
      })
    }
  }
}
</script>
