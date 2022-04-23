<template>
  <div>
    <div v-if='isLoading'>loading</div>

    <div v-if='error'>Something bad happened</div>

    <div v-if='feed'>
      <div class='article-preview' v-for='(article, index) in feed.articles' :key='index'>
        <div class='article-meta'>
          <router-link :to='{name: "userProfile", params: {slug: article.author.username}}'>
            <img :src='article.author.source' alt=''>
          </router-link>
          <div class='info'>
            <router-link class='author' :to='{name: "userProfile", params: {slug: article.author.username}}'>
              {{ article.author.username }}
            </router-link>
            <span class='date'>{{ article.createdAt }}</span>
          </div>
          <div class='pull-xs-right'>
            ADD TO FAVORITES
          </div>
        </div>
        <router-link :to='{name: "article", params: {slug: article.slug}}' class='preview-link'>
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>

      <mcv-pagination
        :total='total'
        :limit='limit'
        :current-page='currentPage'
        :url='url'
      />
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed'
import {mapState} from 'vuex'
import McvPagination from '@/components/Pagination'

export default {
  name: 'McvFeed',
  components: {
    McvPagination
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      limit: 10,
      total: 500,
      currentPage: 5,
      url: '/tags/dragons'
    }
  },
  computed: {
    ...mapState({
      feed: state => state.feed.data,
      isLoading: state => state.feed.isLoading,
      error: state => state.feed.error
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl})
  }
}
</script>
