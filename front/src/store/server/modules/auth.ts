import Client from '@/models/Client'
import Auth from '@/models/Auth'
import nanoid from 'nanoid'

import { has } from 'lodash-es'

export default {
  namespaced: true,
  state: {
    clients: {}
  },
  mutations: {
    addClient (state: any, peerId: string) {
      state.peers[peerId] = new Client(nanoid(), peerId)
    }
  },
  getters: {
    clients (state: any) {
      return state.clients
    }
  },
  actions: {
    resolve (state: any, auth: Auth) {
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
