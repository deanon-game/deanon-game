import User from '@/models/server/User'
import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config'
import Auth from '@/models/server/Auth'

export default class Server extends User {
  constructor (state: any, id?: string) {
    const peer = new Peer(id, p2pConfig)
    super('', 'server', 'system')
    peer.on('open', (id) => {
      this.id = id
    })
    peer.on('connection', (connection) => {
      state.dispatch('server/auth/resolve', new Auth(this, connection), { root: true })
      connection.on('data', (data) => {
        state.dispatch('onGotData', { data, connection }, { root: true })
      })
    })
  }
}
