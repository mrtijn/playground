import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/particles',
      name: 'particles',
      component: () => import(/* webpackChunkName: "about" */ './views/Particles.vue')
    },
    // {
    //   path: '/particles-detail',
    //   name: 'particles-detail',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Particles-detail.vue')
    // }
  ]
})
