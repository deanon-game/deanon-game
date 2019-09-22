import Peer from 'peerjs'
import p2pConfig from '../p2p.config'

export default {
  namespaced: true,
  state: {
    connection: {}
  },
  mutations: {
    connection (state, connection) {
      state.connection = connection
    }
  },
  getters: {
    connection (state) {
      return state.connection
    }
  },
  actions: {
    connect (state, serverId, peerId = null) {
      return new Promise((resolve, reject) => {
        try {
          const peer = new Peer(peerId, p2pConfig)

          state.commit('connection', peer.connect(serverId))

          state.getters.connection.on('open', () => {
            state.getters.connection.on('data', function (data) {
              console.log('get:', data)
            })
            resolve()
          })
        } catch (err) {
          reject(err)
        }
      })
    },
    send (state, payload) {
      console.log('send', payload)
      state.getters.connection.send('hi')
    }
  }
}
