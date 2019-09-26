import Peer from 'peerjs'
import p2pConfig from '../p2p.config'
import recognizer from '@/helpers/recognizer/index'

export default {
  namespaced: true,
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

          peer.on('open', function (id) {
            state.commit('peerId', id)
            resolve(id)
            console.log('server created with id', id)
          })
          peer.on('connection', function (conn) {
            conn.on('data', (data) => {
              recognizer.resolve({
                data,
                connection: conn
              })
            })
          })
          state.commit('peer', peer)
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
