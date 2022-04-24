<template>
  <div class='feed-toggle'>
    <ul class='nav nav-pills outline-active'>
      <li class='nav-item' v-if='isLoggedIn'>
        <router-link :to='{name: "yourFeed"}' class='nav-link' :class='{active: routeName === "yourFeed"}'>
          Your Feed
        </router-link>
      </li>

      <li class='nav-item' v-if='isLoggedIn'>
        <router-link :to='{name: "globalFeed"}' class='nav-link' :class='{active: routeName === "globalFeed"}'>
          Global Feed
        </router-link>
      </li>

      <li class='nav-item' v-if='tagName'>
        <router-link :to='{name: "tags"}' class='nav-link' :class='{active: routeName === "tags"}'>
          <i class='ion-pound' />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {gettersTypes} from '@/store/modules/auth'

export default {
  name: 'McvFeedToggler',
  props: {
    tagName: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: gettersTypes.isLoggedIn
    }),
    routeName() {
      return this.$route.name
    }
  }
}
</script>
