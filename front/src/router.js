import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import(/* webpackChunkName: "MainPage" */ './views/MainPage.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "CreateHost" */ './views/CreateHost.vue')
    },
    {
      path: '/join/:id',
      name: 'join',
      component: () => import(/* webpackChunkName: "JoinGame" */ './views/JoinChat.vue')
    }
  ]
})
