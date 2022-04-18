<template>
  <div class='auth-page'>
    <div class='container page'>
      <div class='row'>
        <div class='col-md-6 offset-md-3 col-xs12'>
          <h1 class='text-xs-center'>Sign Up</h1>
          <p class='text-xs-center'>
            <router-link :to="{name: 'login'}">Have an account?</router-link>
          </p>

          <mcv-validation-errors
            v-if='validationErrors'
            :validation-errors='validationErrors' />

          <form @submit.prevent='onSubmit'>
            <fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='username'
                  name='username'
                  class='form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty'
                  type='text'
                  placeholder='Username'>
              </fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='email'
                  name='email'
                  class='form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email'
                  type='email'
                  placeholder='Email'>
              </fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='password'
                  name='password'
                  class='form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty'
                  type='password'
                  placeholder='Password'>
              </fieldset>

              <button
                :disabled='isSubmitting'
                class='btn btn-lg btn-primary pull-xs-right ng-binding'
                type='submit'>
                Sign up
              </button>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from '@/store/modules/auth'
import {mapState} from 'vuex'

export default {
  name: 'McvRegister',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    }
  }
}
</script>
