import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config.ts'
import seriallize from '@/helpers/seriallize'
import { LogCall } from '@/helpers/decorators/log'
import { isNil } from 'lodash-es'
import ClientChatModule from '@/store/modules/client-chat'
import unserialize from '@/helpers/unserialize'

export interface IClientModule {}

type Connection = Peer.DataConnection

export interface ConnectionPayload {
  serverId: string,
  peerId?: string
}
@Module({ dynamic: true, store, name: 'client' })
class ClientModule extends VuexModule implements IClientModule {
  private _connection: Connection | null = null

  get connection (): Connection | null {
    return this._connection
  }

  @Mutation
  @LogCall
  setConnection (connection: Connection) {
    this._connection = connection
  }

  @Action
  @LogCall
  connect (connectionPayload:ConnectionPayload) {
    return new Promise((resolve, reject) => {
      try {
        const peer = new Peer(connectionPayload.peerId, p2pConfig)

        peer.on('open', (serverId) => {
          resolve()
        })

        const connection = peer.connect(connectionPayload.serverId)

        connection.on('data', (request: any) => {
          const strRequest = unserialize(request)
          console.log('got', strRequest)
          if ('messages' in strRequest) {
            ClientChatModule.updateMessages(strRequest.messages)
          }
        })

        this.setConnection(connection)
      } catch (err) {
        reject(err)
      }
    })
  }

  @Action
  @LogCall
  send (payload: any) {
    if (isNil(payload)) return
    if (this.connection) {
      this.connection.send(seriallize(payload))
    }
  }
}

export default getModule(ClientModule)
