<template>
  <div>
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'McvErrorMessage',
  props: {
    message: {
      required: false,
      type: String,
      default: 'Something went wrong'
    }
  }
}
</script>
