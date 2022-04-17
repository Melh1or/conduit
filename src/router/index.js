import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '@/views/HomeView'
import Register from '@/views/Register'
import Login from '@/views/Login'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
