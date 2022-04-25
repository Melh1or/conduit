<template>
  <div class='article-page'>
    <div class='banner'>
      <div class='container' v-if='article'>
        <h1>{{ article.title }}</h1>
        <div class='article-meta'>
          <router-link :to='{name: "userProfile", params: {slug: article.author.username} }'>
            <img :src='article.author.image' alt=''>
          </router-link>
          <div class='info'>
            <router-link :to='{name: "userProfile", params: {slug: article.author.username} }'>
              {{ article.author.username }}
            </router-link>
            <span class='date'>
              {{ article.updatedAt }}
            </span>
          </div>
          <router-link
            :to='{name: "editArticle", params: {slug: article.slug}}'
            class='btn btn-outline-secondary outline-sm'
          >
            <i class='ion-edit' />
            Edit Article
          </router-link>
          <button class='btn btn-outline-danger btn-small'>
            <i class='ion-trash-a'>
              Delete article
            </i>
          </button>
        </div>
      </div>
    </div>
    <div class='container page'>
      <mcv-loading v-if='isLoading' />
      <mcv-error-message v-if='error' />
      <div class='row article-content' v-if='article'>
        <div class='col-xs-12'>
          <div>
            <p class='article-body'>{{article.body}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/article'
import McvErrorMessage from '@/components/ErrorMessage'
import McvLoading from '@/components/Loading'

export default {
  name: 'McvArticle',
  components: {
    McvErrorMessage,
    McvLoading
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {slug: this.$route.params.slug})
  },
  computed: {
    ...mapState(({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => console.log(state.article.data) || state.article.data
    }))
  }
}
</script>
