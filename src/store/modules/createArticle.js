import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  data: null,
  validationErrors: null
}

export const mutationTypes = {
  createArticleStart: '[createArticle] createArticleStart',
  createArticleSuccess: '[createArticle] createArticleSuccess',
  createArticleFailure: '[createArticle] createArticleFailure'
}

export const actionTypes = {
  createArticle: '[createArticle] createArticle'
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createArticle](context, {inputArticle}) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.createArticleStart)
      articleApi.createArticle(inputArticle)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          context.commit(mutationTypes.createArticleFailure, result.response.data.errors)
          reject(result.response.data.errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
