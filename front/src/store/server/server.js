import Peer from 'peerjs'
import p2pConfig from '../p2p.config'

import modules from './modules/index.ts'

import recognizer from '@/helpers/recognizer/index'

export default {
  namespaced: true,
  modules,
  state: {
    peer: {},
    peerId: null
  },
  mutations: {
    peer (state, value) {
      state.peer = value
    },
    peerId (state, value) {
      state.peerId = value
    }
  },
  getters: {
    peer (state) {
      return state.peer
    },
    peerId (state) {
      return state.peerId
    }
  },
  actions: {
    create (state, serverId = null) {
      return new Promise((resolve, reject) => {
        try {
          const peer = new Peer(serverId, p2pConfig)

          peer.on('open', (id) => {
            state.commit('peerId', id)
            resolve(id)
            console.log('server created with id', id)
          })
          peer.on('connection', (connection) => {
            state.dispatch('auth/resolve', { caller: 'system', connection })
            connection.on('data', (data) => {
              state.dispatch('onGotData', { data, connection })
            })
          })
          state.commit('peer', peer)
        } catch (err) {
          reject(err)
        }
      })
    },
    onGotData (state, { data, connection }) {
      recognizer.resolve({
        data,
        connection
      })
    }
  }
}
