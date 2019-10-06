import User from '@/models/server/User'
import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config'
import ApiRequest from '@/models/api/ApiRequest'

import AuthModule from '@/store/modules/server-auth'
import ServerModule from '@/store/modules/server-core'
import Client from './Client'
import unserialize from '@/helpers/unserialize'

export default class Server extends User {
  public peer: Peer
  constructor (id?: string) {
    const peer = new Peer(id, p2pConfig)
    super({ name: 'Система', role: 'system', id: peer.id })
    this.peer = peer
    this.peer.on('open', (id) => {
      this.id = id
    })
    this.peer.on('connection', (connection) => {
      if (!ServerModule.server) return
      AuthModule.registerNewClient(connection)
      connection.on('data', (request: any) => {
        if (!ServerModule.server) return
        AuthModule.getClientByConnection(connection)
          .then((caller:Client | null) => {
            if (caller) {
              ServerModule.onGotData(
                new ApiRequest(caller, unserialize(request))
              )
            }
          })
      })
    })
  }
}
