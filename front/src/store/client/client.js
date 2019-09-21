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
    connect (state, gameId) {
      const peer = new Peer('sender', p2pConfig)

      console.log('client created', peer)
      state.commit('connection', peer.connect('receiver'))

      state.getters.connection.on('open', () => {
        state.getters.connection.on('data', function (data) {
          console.log('get:', data)
        })
      })
    },
    send (state, payload) {
      console.log('send', payload)
      state.getters.connection.send('hi')
    }
  }
}
