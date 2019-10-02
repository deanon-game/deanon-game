import User from '@/models/server/User'
import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config'
import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'

import AuthModule from '@/store/modules/server-auth'
import ServerModule from '@/store/modules/server-core'
import IData from '@/models/api/Data'

export default class Server extends User {
  constructor (id?: string) {
    const peer = new Peer(id, p2pConfig)
    super({ name: 'server', role: 'system', id: peer.id })
    peer.on('open', (id) => {
      this.id = id
    })
    peer.on('connection', (connection) => {
      if (!ServerModule.server) return
      AuthModule.registerNewClient(
        new ModuleRequest<never, never>(
          ServerModule.server,
          connection
        )
      )
      connection.on('data', (data: IData<FreeObject, FreeObject>) => {
        if (!ServerModule.server) return
        ServerModule.process(
          new ModuleRequest<FreeObject, FreeObject>(
            ServerModule.server,
            connection,
            data
          ))
      })
    })
  }
}
