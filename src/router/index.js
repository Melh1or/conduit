import {createRouter, createWebHistory} from 'vue-router'

import GlobalFeed from '@/views/GlobalFeed'
import Register from '@/views/Register'
import Login from '@/views/Login'
import YourFeed from '@/views/YourFeed'
import TagFeed from '@/views/TagFeed'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed
  },
  {
    path: '/tags/:slug',
    name: 'tags',
    component: TagFeed
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: 'createArticle'
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: 'article'
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: 'editArticle'
  },
  {
    path: '/settings',
    name: 'settings',
    component: 'settings'
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: 'profiles'
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: 'userProfileFavorites'
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
