<template>
  <div class='profile-page' v-if='userProfile'>
    <div class='user-info'>
      <div class='container'>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            <img :src='userProfile.image' class='user-img'>
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link
                v-if='isCurrentUserProfile'
                :to='{name: "settings"}'
                class='btn btn-small btn-outline-secondary action-btn'
              >
                Edit profile settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='container'>
      <div class='row'>
        <div class='col-xs-12 col-md-10 offset-md-1'>
          <div class='article-toggle'>
            <ul class='nav nav-pills outline-active'>
              <li class='nav-item'>
                <router-link
                  :to='{name: "userProfile", params: {slug: userProfile.username}}'
                  class='nav-link'
                  :class='{active: routeName === "userProfile"}'
                >
                  My Post
                </router-link>
              </li>
              <li class='nav-item'>
                <router-link
                  :to='{name: "userProfileFavorites", params: {slug: userProfile.username}}'
                  class='nav-link'
                  :class='{active: routeName === "userProfileFavorites"}'
                >
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <mcv-feed :api-url='apiUrl ' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile'
import {gettersTypes as authGettersTypes} from '@/store/modules/auth'
import McvFeed from '@/components/Feed'

export default {
  name: 'McvUserProfile',
  components: {McvFeed},
  computed: {
    ...mapState({
      isLoading: state => state.userProfile.isLoading,
      error: state => state.userProfile.error,
      userProfile: state => state.userProfile.data
    }),
    ...mapGetters({
      currentUser: authGettersTypes.currentUser
    }),
    isCurrentUserProfile() {
      if (!this.userProfile || !this.currentUser) {
        return false
      }
      return this.userProfile.username === this.currentUser.username
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites')
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`
    },
    routeName() {
      return this.$route.name
    }
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile()
    }
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {slug: this.userProfileSlug})
    }
  },
  mounted() {
    this.getUserProfile()
  }
}
</script>
