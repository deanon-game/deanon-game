import store from '@/store/index'

import Server from '@/models/server/Server'
import IData from '@/models/api/IData'

import NPeer from 'peerjs'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

interface OnGotDataPayload {
  connection: NPeer.DataConnection
  data: IData
}

export interface IServerModule {
  readonly server: Server | null
  readonly linkToConnect: string | null
  setServer (server: Server) : void
  create (serverId?: string) : void
  onGotData (payload: OnGotDataPayload) : void
}

@Module({ dynamic: true, store, name: 'server' })
class ServerModule extends VuexModule implements IServerModule {
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
  public setServer (server: Server) {
    this._server = server
  }

  @Action
  public create (serverId?: string) {
    try {
      const server = new Server(serverId)
      this.context.commit('setServer', server)
    } catch (err) {
      throw new Error(err)
    }
  }
  @Action
  public onGotData (payload: OnGotDataPayload) {
    try {
      console.log('got', payload)
      // const server = new Server(serverId)
      // this.context.commit('setServer', server)
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default getModule(ServerModule)
