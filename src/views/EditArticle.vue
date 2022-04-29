<template>
  <div>
    <mcv-loading v-if='isLoading' />
    <mcv-article-form
      v-if='initialValues'
      :initial-values='initialValues'
      :errors='validationErrors'
      :is-submitting='isSubmitting'
      @articleSubmit='onSubmit'
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/editArticle'
import McvArticleForm from '@/components/ArticleForm'
import McvLoading from '@/components/Loading'

export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
    McvLoading
  },
  computed: {
    ...mapState({
      isLoading: state => state.editArticle.isLoading,
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors,
      article: state => state.editArticle.data
    }),
    initialValues() {
      if (!this.article) {
        return null
      }

      return this.article
    }
  },
  methods: {
    onSubmit(articleInput) {
      this.$store.dispatch(actionTypes.updateArticle, {
        slug: this.$route.params.slug,
        articleInput
      })
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  }
}
</script>
