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
          <span v-if='isAuthor'>
            <router-link
              :to='{name: "editArticle", params: {slug: article.slug}}'
              class='btn btn-outline-secondary outline-sm'
            >
              <i class='ion-edit' />
              Edit Article
            </router-link>
            <button
              @click='deleteArticle'
              class='btn btn-outline-danger btn-small'
            >
              <i class='ion-trash-a'>
                Delete article
              </i>
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class='container page'>
      <mcv-loading v-if='isLoading' />
      <mcv-error-message v-if='error' />
      <div class='row article-content' v-if='article'>
        <div class='col-xs-12'>
          <div>
            <p class='article-body'>{{ article.body }}</p>
          </div>
          <mcv-tag-list :tags='article.tagList' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {gettersTypes as authGettersTypes} from '@/store/modules/auth'
import McvErrorMessage from '@/components/ErrorMessage'
import McvLoading from '@/components/Loading'
import McvTagList from '@/components/TagList'

export default {
  name: 'McvArticle',
  components: {
    McvErrorMessage,
    McvLoading,
    McvTagList
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {slug: this.$route.params.slug})
  },
  methods: {
    deleteArticle() {
      this.$store.dispatch(articleActionTypes.deleteArticle, {slug: this.$route.params.slug})
        .then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      currentUser: authGettersTypes.currentUser
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    }
  }
}
</script>
