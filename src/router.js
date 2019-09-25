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
      path: '/playground',
      name: 'playground',
      component: () => import(/* webpackChunkName: "about" */ './views/Playground.vue')
    },
    // {
    //   path: '/particles-detail',
    //   name: 'particles-detail',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Particles-detail.vue')
    // }
  ]
})
