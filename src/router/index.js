import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '@/views/HomeView'
import Register from '@/views/Register'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Register
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
