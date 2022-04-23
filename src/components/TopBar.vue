<template>
  <nav class='navbar navbar-light'>
    <div class='container'>
      <router-link :to='{name: "globalFeed"}'>
        Medium Clone
      </router-link>

      <ul class='nav navbar-nav pull-xs-right'>
        <li class='nav-item'>
          <router-link :to='{name: "globalFeed"}' exact class='nav-link' active-class='active'>
            Home
          </router-link>
        </li>

        <template v-if='isLoggedIn'>
          <li class='nav-item'>
            <router-link :to='{name: "createArticle"}' class='nav-link' active-class='active'>
              <i class='ion-compose' />&nbsp;New Article
            </router-link>
          </li>

          <li class='nav-item'>
            <router-link :to='{name: "settings"}' class='nav-link' active-class='active'>
              <i class='ion-gear-a' />&nbsp;Settings
            </router-link>
          </li>

          <li class='nav-item'>
            <router-link :to='{name: "userProfile", params: {slug: currentUser.username}}' class='nav-link' active-class='active'>
              <img class='user-pic' :src='currentUser.image' />&nbsp;{{ currentUser.username }}}
            </router-link>
          </li>
        </template>

        <template v-if='isAnonymous'>
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
import {mapGetters} from 'vuex'
import {gettersTypes} from '@/store/modules/auth'

export default {
  name: 'McvTopBar',
  computed: {
    ...mapGetters({
      currentUser: gettersTypes.currentUser,
      isLoggedIn: gettersTypes.isLoggedIn,
      isAnonymous: gettersTypes.isAnonymous
    })
  }
}
</script>
