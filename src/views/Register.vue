<template>
  <div class='auth-page'>
    <div class='container page'>
      <div class='row'>
        <div class='col-md-6 offset-md-3 col-xs12'>
          <h1 class='text-xs-center'>Sign Up</h1>
          <p class='text-xs-center'>
            <router-link :to="{name: 'login'}">Need an account?</router-link>
          </p>
          validation errors


          <form @submit.prevent='onSubmit'>
            <fieldset>

              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty'
                  type='text'
                  placeholder='Username'>
              </fieldset>

              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email'
                  type='email'
                  placeholder='Email'>
              </fieldset>

              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty'
                  type='password'
                  placeholder='Password'>
              </fieldset>

              <button
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
export default {
  name: 'McvRegister',
  methods: {
    onSubmit: console.log
  }
}
</script>
