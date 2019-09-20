import Peer from 'peerjs'

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
      const peer = new Peer('receiver', { host: '/', debug: 0, port: 9000, path: '/api/p2p/' })

      console.log('server created', peer)

      peer.on('open', function (id) {
        console.log('My peer ID is: ' + id)
      })
      peer.on('connection', function (conn) {
        conn.on('data', (data) => {
          console.log('Сервер получил сообщение: ', data)
        })
      })

      // state.commit('peer', peer)
    }
  }
}
