import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "CreateGame" */ './views/CreateGame.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import(/* webpackChunkName: "JoinGame" */ './views/JoinGame.vue')
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: () => import('./views/GamePreRoom.vue')
    }
  ]
})
