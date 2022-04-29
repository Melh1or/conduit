<template>
  <ul class='tag-list'>
    <li v-for='tag in tags' :key='tag' class='tag-default tag-pill tag-outline ng-binding ng-scope'>
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvTagList',
  props: {
    tags: {
      required: true,
      type: Array
    }
  }
}
</script>
