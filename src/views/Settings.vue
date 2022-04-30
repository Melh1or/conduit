<template>
  <div v-if='currentUser' class='settings-page'>
    <div class='container page'>
      <div class='row'>
        <div class='col-md-6 offset-md-3 col-xs-12'>
          <h1 class='text-xs-center'>Your Settings</h1>

          <mcv-validation-errors v-if='validationErrors' :validation-errors='validationErrors' />

          <form @submit.prevent='onSubmit'>
            <fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='form.url'
                  name='url'
                  class='form-control'
                  type='text'
                  placeholder='URL of profile picture'
                >
              </fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='form.username'
                  name='username'
                  class='form-control form-control-lg'
                  type='text'
                  placeholder='Username'
                >
              </fieldset>

              <fieldset class='form-group'>
                <textarea
                  v-model='form.bio'
                  name='bio'
                  class='form-control form-control-lg'
                  rows='8'
                  placeholder='Short bio about you'
                ></textarea>
              </fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='form.email'
                  name='email'
                  class='form-control form-control-lg'
                  type='email'
                  placeholder='Email'
                >
              </fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='form.password'
                  name='password'
                  class='form-control form-control-lg'
                  type='password'
                  placeholder='New Password'
                >
              </fieldset>

              <button class='btn btn-lg btn-primary pull-xs-right' type='submit' :disabled='isSubmitting'>
                Update Settings
              </button>

            </fieldset>
          </form>

          <hr>

          <button class='btn btn-outline-danger' @click='logout' type='button'>
            Or click here to logout.
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import McvValidationErrors from '@/components/ValidationErrors'
import {actionTypes as authActionTypes, gettersTypes as authGettersTypes} from '@/store/modules/auth'

export default {
  name: 'McvSettings',
  components: {
    McvValidationErrors
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      validationErrors: state => state.settings.validationErrors
    }),
    ...mapGetters({
      currentUser: authGettersTypes.currentUser
    }),
    form() {
      return {
        url: this.currentUser.url,
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {
        currentUserInput: this.form
      })
    },
    logout() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({name: 'globalFeed'})
      })
    }
  }
}
</script>
