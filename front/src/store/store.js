import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API_URL: `http://localhost:8000/api/v1/`
  },
  getters: {
    getAPI_URL (state) {
      return state.API_URL
    }
  },
  mutations: {

  },
  actions: {

  }
})
