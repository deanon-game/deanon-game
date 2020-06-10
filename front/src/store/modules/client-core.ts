import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config.ts'
import seriallize from '@/helpers/seriallize'
import { LogClientCall } from '@/helpers/decorators/log'
import { isNil } from 'lodash-es'
import ClientChatModule from '@/store/modules/client-chat'
import unserialize from '@/helpers/unserialize'
import { ClientLogger } from '../../helpers/logger'

export interface IClientModule {}

type Connection = Peer.DataConnection

export interface ConnectionPayload {
  serverId: string,
  peerId?: string
}
@Module({ dynamic: true, store, name: 'clientCore' })
class ClientModule extends VuexModule implements IClientModule {
  private _connection: Connection | null = null

  get connection (): Connection | null {
    return this._connection
  }

  @Mutation
  @LogClientCall
  setConnection (connection: Connection) {
    this._connection = connection
  }

  @Action
  @LogClientCall
  connect (connectionPayload:ConnectionPayload) {
    return new Promise((resolve, reject) => {
      try {
        const peer = new Peer(connectionPayload.peerId, p2pConfig)

        peer.on('open', (serverId) => {
          resolve()
        })

        const connection = peer.connect(connectionPayload.serverId)

        connection.on('data', (strRequest: string) => {
          const request = unserialize(strRequest)
          ClientLogger.log('got data', [{ key: 'parsed request', value: request }])
          if ('messages' in request) {
            ClientChatModule.updateMessages(request.messages)
          }
        })

        this.setConnection(connection)
      } catch (err) {
        reject(err)
      }
    })
  }

  @Action
  @LogClientCall
  send (payload: any) {
    return new Promise((resolve, reject) => {
      if (isNil(payload)) reject(new Error('payload is empty'))
      if (this.connection) {
        this.connection.send(seriallize(payload))

        resolve()
      }
    })
  }
}

export default getModule(ClientModule)
