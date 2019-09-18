import Vue from 'vue'
import Vuex from 'vuex'
import client from 'client/index'
import server from 'server/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    client,
    server
  }
})
