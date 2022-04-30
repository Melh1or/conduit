<template>
  <button
    class='btn btn-sm'
    @click='handleLike'
    :class='{
      "btn-primary": isFavoritedOptimistic,
      "btn-outline-primary": !isFavoritedOptimistic,
    }'
  >
    <i class='ion-heart'></i>
    <span>&nbsp;{{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
  name: 'McvAddToFavorites',
  props: {
    isFavorited: {
      required: true,
      type: Boolean
    },
    articleSlug: {
      required: true,
      type: String
    },
    favoritesCount: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    }
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic
      })
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic -= 1
      } else {
        this.favoritesCountOptimistic += 1
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    }
  }
}
</script>
