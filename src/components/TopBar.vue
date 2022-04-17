<template>
  <nav class='navbar navbar-light'>
    <div class='container'>
      <router-link :to='{name: "home"}'>
        Medium Clone
      </router-link>

      <ul class='nav navbar-nav pull-xs-right'>
        <li class='nav-item'>
          <router-link :to='{name: "home"}' exact class='nav-link' active-class='active'>
            Home
          </router-link>
        </li>

        <template v-if='isLoggedIn'>
          <li class='nav-item'>
            <router-link :to='{name: "home"}' class='nav-link' active-class='active'>
              <i class='ion-compose' />&nbsp;New Article
            </router-link>
          </li>

          <li class='nav-item'>
            <router-link :to='{name: "home"}' class='nav-link' active-class='active'>
              <i class='ion-gear-a' />&nbsp;Settings
            </router-link>
          </li>

          <li class='nav-item'>
            <router-link :to='{name: "home", params: {slug: currentUser.username}}' class='nav-link' active-class='active'>
              <img class='user-pic' :src='currentUser.image' />&nbsp;{{ currentUser.username }}}
            </router-link>
          </li>
        </template>

        <template v-if='!isLoggedIn'>
          <li class='nav-item'>
            <router-link :to='{name: "login"}' class='nav-link' active-class='active'>
              Sign In
            </router-link>
          </li>

          <li class='nav-item'>
            <router-link :to='{name: "register"}' class='nav-link' active-class='active'>
              Sign Up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'McvTopBar',
  computed: {
    ...mapState({
      currentUser: state => state.auth.currentUser,
      isLoggedIn: state => state.auth.isLoggedIn
    })
  }
}
</script>
