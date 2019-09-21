import Peer from 'peerjs'
import p2pConfig from '../p2p.config'

export default {
  namespaced: true,
  state: {
    peer: {}
  },
  mutations: {
    peer (state, value) {
      state.peer = value
    }
  },
  getters: {
    peer (state) {
      return state.peer
    },
    peerId (state) {
      return state.peer.id
    }
  },
  actions: {
    create (state) {
      const peer = new Peer('receiver', p2pConfig)
      console.log('server created', peer)

      peer.on('open', function (id) {
        console.log('My peer ID is: ' + id)
      })
      peer.on('connection', function (conn) {
        conn.on('data', function (data) {
          // Will print 'hi!'
          console.log(data)
        })
      })

      // state.commit('peer', peer)
    }
  }
}
