import Peer from 'peerjs'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {
    connect (state, gameId) {
      const peer = new Peer('sender', { host: '/', debug: 3, port: 9000, path: '/api/p2p/' })

      console.log('client created', peer)
      const conn = peer.connect('receiver')

      conn.on('open', () => {
        conn.on('data', function (data) {
          console.log('Получено:', data)
        })
        conn.send('ПРИВЕТ!!!!')
        conn.send('ПРИВЕТ!!!!')
      })
    }
  }
}
