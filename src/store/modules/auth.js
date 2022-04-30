import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isLoading: false,
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailure: '[auth] updateCurrentUserFailure'
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser'
}

export const gettersTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
}

const getters = {
  [gettersTypes.currentUser]: state => {
    return state.currentUser
  },
  [gettersTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [gettersTypes.isAnonymous]: state => {
    return state.isLoggedIn === false
  }
}

const mutations = {
  //register
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  // login
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  // get current user
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.currentUser = payload
    state.isLoading = false
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },

  // update current user
  // all empty mutations will be filled in settings module
  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload
  },
  [mutationTypes.updateCurrentUserFailure]() {}
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.registerStart)
      authApi.register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(error => {
          console.log('catch', error.response.data.errors)
          context.commit(mutationTypes.registerFailure, error.response.data.errors)
          reject(error.response.data.errors)
        })
    })
  },

  [actionTypes.login](context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.loginStart)
      authApi.login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(error => {
          console.log('catch', error.response.data.errors)
          context.commit(mutationTypes.loginFailure, error.response.data.errors)
          reject(error.response.data.errors)
        })
    })
  },

  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart)
      authApi.getCurrentUser()
        .then((response) => {
          context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure)
        })
    })
  },

  [actionTypes.updateCurrentUser](context, {currentUserInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateCurrentUserStart)
      authApi.updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationTypes.getCurrentUserSuccess, user)
          resolve(user)
        })
        .catch((result) => {
          context.commit(mutationTypes.getCurrentUserFailure, result.response.data.errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
