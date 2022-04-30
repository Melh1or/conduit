import addToFavoritesApi from '@/api/addToFavorites'

const mutationTypes = {
  addToFavoritesStart: '[addToFavoritesStart] addToFavoritesStartStart',
  addToFavoritesSuccess: '[addToFavoritesStart] addToFavoritesSuccess',
  addToFavoritesFailure: '[addToFavoritesStart] addToFavoritesFailure'
}

export const actionTypes = {
  addToFavorites: '[addToFavorites] addToFavorites'
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},
}

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorited
        ? addToFavoritesApi.deleteFromFavorites({slug})
        : addToFavoritesApi.addToFavorites({slug})

      promise
        .then(article => {
          context.commit(mutationTypes.addToFavoritesSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailure)
        })
    })
  }
}

export default {
  actions,
  mutations
}
