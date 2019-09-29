import modules from '@/store/server/modules/index'
import Server from '@/models/server/Server'

export default {
  namespaced: true,
  modules,
  state: {
    server: null
  },
  getters: {
    server (state: any) {
      return state.server
    },
    linkToConnect (state: any) {
      if (state.server.id) {
        return `${window.location.origin}/join/${state.server.id}`
      } else {
        return false
      }
    }
  },
  mutations: {
    server (state: any, server: Server) {
      state.server = server
    }
  },
  actions: {
    create (state: any, serverId?: string) {
      return new Promise((resolve, reject) => {
        try {
          state.commit('server', new Server(state, serverId))
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
