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
      const peer = new Peer('receiver', { host: '/', port: 9000, path: '/api/p2p/' })

      console.log('server created', peer)

      peer.on('open', function (id) {
        console.log('My peer ID is: ' + id)
      })
      peer.on('connection', function (conn) {
        console.log('connected new peer with connection', conn)
      })
      // state.commit('peer', peer)

      const peer2 = new Peer('sender', { host: '/', port: 9000, path: '/api/p2p/' })

      const conn = peer2.connect('receiver')

      conn.on('open', () => {
        conn.send('hi!')
      })

      // var conn = peer2.connect(id)
      // console.log('new connection', conn)
      // conn.on('open', function () {
      //   // Receive messages
      //   conn.on('data', function (data) {
      //     console.log('Received', data)
      //   })

      //   // Send messages
      //   conn.send('Hello!')
      // })
    }
  }
}
