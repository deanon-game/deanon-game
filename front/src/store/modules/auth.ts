import Client from '@/models/server/Client'
import IAuth from '@/models/server/IAuth'
import nanoid from 'nanoid'

import { has } from 'lodash-es'

export default {
  namespaced: true,
  state: {
    clients: {}
  },
  mutations: {
    addClient (state: any, auth: IAuth) {
      state.peers[auth.connection.connectionId] = new Client(nanoid(), auth)
    }
  },
  getters: {
    clients (state: any) {
      return state.clients
    }
  },
  actions: {
    resolve (state: any, auth: IAuth) {
      const id = auth.connection.connectionId
      if (has(state.getters.clients, id)) {
        if (has(state.getters.clients, `${id}.type`)) {
          state.commit('updateClientData')
        }
        console.log(id)
      } else {
        state.commit('addClient', id)
        console.log('addClient with id = ', id)
      }
    }
  }
}
