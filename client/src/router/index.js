import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },,
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/myself',
    name: 'Myself',
    component: () => import(/* webpackChunkName: "about" */ '../views/myself.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
