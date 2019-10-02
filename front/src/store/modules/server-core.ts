import store from '@/store/index'

import Server from '@/models/server/Server'
import IData from '@/models/api/Data'
import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'
import Recognizer from '@/helpers/recognizer'

import NPeer from 'peerjs'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

interface OnGotDataPayload {
  connection: NPeer.DataConnection
  data: IData<FreeObject, FreeObject>
}

export interface IServerModule {
  readonly server: Server | null
  readonly linkToConnect: string | null
  setServer (server: Server) : void
  create (serverId?: string) : void
  process (payload: OnGotDataPayload) : void
}

export interface ICorePermissions {
  all?: boolean
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
  process (request: ModuleRequest<FreeObject, FreeObject>) {
    try {
      console.log('got', request)

      Recognizer.process(request)
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default getModule(ServerModule)
