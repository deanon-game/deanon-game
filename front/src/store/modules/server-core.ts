import store from '@/store/index'

import Server from '@/models/server/Server'
import IData from '@/models/api/Data'
import ApiRequest from '@/models/api/ApiRequest'
import Recognizer from '@/helpers/recognizer'

import NPeer from 'peerjs'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { LogCall } from '@/helpers/decorators/log'
import ApiBroadcastRequest from '@/models/api/ApiBroacastRequest'
import AuthModule from '@/store/modules/server-auth'
import unreact from '@/helpers/seriallize'

interface OnGotDataPayload {
  connection: NPeer.DataConnection
  data: IData<any, any>
}

export interface IServerModule {
  readonly server: Server | null
  readonly linkToConnect: string | null
  setServer (server: Server) : void
  create (serverId?: string) : void
  onGotData (payload: OnGotDataPayload) : void
}

@Module({ dynamic: true, store, name: 'server' })
class ServerModule extends VuexModule {
  private _server: Server | null = null

  get server (): Server | null {
    return this._server
  }
  get linkToConnect (): string | null {
    if (this.server) {
      return `${window.location.origin}/join/${this.server.id}`
    } else {
      return null
    }
  }

  @Mutation
  @LogCall
  public setServer (server: Server) {
    this._server = server
  }

  @Action
  @LogCall
  public create (serverId?: string) {
    try {
      const server = new Server(serverId)
      this.setServer(server)
    } catch (err) {
      throw new Error(err)
    }
  }
  @Action
  @LogCall
  broadcastChatData (request: ApiBroadcastRequest) {
    for (let key in AuthModule.clients) {
      AuthModule.clients[key].connection.send(
        unreact(request)
      )
    }
  }
  @Action
  @LogCall
  onGotData (request: ApiRequest) {
    try {
      Recognizer.process(request)
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default getModule(ServerModule)
