import Vue from 'vue'
import Vuex from 'vuex'
import client from './client/index.js'
import server from './server/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    client,
    server
  }
})
