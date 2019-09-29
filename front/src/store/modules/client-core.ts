import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config.ts'

export interface IClientModule {}

type Connection = Peer.DataConnection

interface ConnectionPayload {
  serverId: string,
  peerId?: string
}
@Module({ dynamic: true, store, name: 'client' })
class ClientModule extends VuexModule implements IClientModule {
  private _connection: Connection | null = null

  @Mutation
  setConnection (connection: Connection) {
    this._connection = connection
  }

  get connection (): Connection | null {
    return this._connection
  }

  @Action
  connect (connectionPayload:ConnectionPayload) {
    return new Promise((resolve, reject) => {
      try {
        const peer = new Peer(connectionPayload.peerId, p2pConfig)

        peer.on('open', () => {
          // peer.on('data', (data: any): void => {
          //   console.log('get:', data)
          // })
          resolve()
        })

        this.setConnection(peer.connect(connectionPayload.serverId))
      } catch (err) {
        reject(err)
      }
    })
  }

  @Action
  send (payload: any) {
    console.log('send', payload)
    if (this.connection) {
      this.connection.send(payload)
    }
  }
}

export default getModule(ClientModule)
