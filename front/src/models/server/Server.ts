import User from '@/models/server/User'
import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config'
import Auth from '@/models/server/Auth'

import AuthModule from '@/store/modules/server-auth'
import ServerModule from '@/store/modules/server-core'

export default class Server extends User {
  constructor (id?: string) {
    const peer = new Peer(id, p2pConfig)
    super('', 'server', 'system')
    peer.on('open', (id) => {
      this.id = id
    })
    peer.on('connection', (connection) => {
      AuthModule.resolve(new Auth(this, connection))
      connection.on('data', (data) => {
        ServerModule.onGotData({ data, connection })
      })
    })
  }
}
