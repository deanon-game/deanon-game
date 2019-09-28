import User from '@/models/server/User'
import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config'

export default class Server extends User {
  constructor (state: any, id?: string) {
    const peer = new Peer(id, p2pConfig)
    super('', 'server', 'system')
    peer.on('open', (id) => {
      this.id = id
    })
    peer.on('connection', (connection) => {
      state.dispatch('auth/resolve', { caller: 'system', connection }, { root: true })
      connection.on('data', (data) => {
        state.dispatch('onGotData', { data, connection }, { root: true })
      })
    })
  }
}
