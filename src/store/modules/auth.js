import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUer: null,
  validationErrors: null,
  isLoggedIn: null
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure'
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUer = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUer = payload
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
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
}

export default {
  state,
  mutations,
  actions
}