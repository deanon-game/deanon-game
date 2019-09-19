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
      const peer = new Peer('flsdkjflksjd', { host: '/p2p/' })
      peer.on('connection', (conn) => {
        conn.on('data', (data) => {
          console.log(data)
        })
      })
      state.commit('peer', peer)
    }
  }
}
