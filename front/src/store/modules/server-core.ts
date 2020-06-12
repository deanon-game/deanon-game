import store from '@/store/index'

import Server from '@/models/server/Server'
import IData from '@/models/api/Data'
import ApiRequest from '@/models/api/ApiRequest'

import NPeer from 'peerjs'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { LogHostCall } from '@/helpers/decorators/log'
import ApiBroadcastRequest from '@/models/api/ApiBroacastRequest'
import seriallize from '@/helpers/seriallize'
import { HostLogger } from '@/helpers/logger'

import Client from '@/models/server/Client'
import unserialize from '@/helpers/unserialize'
import { isNil } from 'lodash-es'

import AuthModule from '@/store/modules/server-auth'
import ChatModule from '@/store/modules/server-chat'

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

type CB = (connection: any) => any

@Module({ dynamic: true, store, name: 'serverCore' })
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
  @LogHostCall
  public setServer (server: Server) {
    this._server = server
  }

  @Action
  @LogHostCall
  public create (serverId?: string) {
    try {
      const cb = (connection: any) => {
        if (!this.server) return

        AuthModule.registerNewClient(connection)

        connection.on('data', async (request: string) => {
          if (!this.server) return
          try {
            const caller:Client | null = await AuthModule.getClientByConnection(connection)
            if (!isNil(caller) && !isNil(request)) {
              const unserrializedRequest = unserialize(request)
              await this.onGotData(new ApiRequest(caller, unserrializedRequest))
            }
          } catch (e) {
            console.error(e)
          }
        })
      }
      const server = new Server(cb as CB, serverId)

      this.setServer(server)
    } catch (err) {
      HostLogger.error('create', err)
    }
  }
  @Action
  @LogHostCall
  async broadcastChatData (request: ApiBroadcastRequest) {
    const serrialized = seriallize(request)
    for (let key in AuthModule.clients) {
      AuthModule.clients[key].connection.send(serrialized)
    }
  }

  @Action
  @LogHostCall
  public async tryProcessQuery (request: ApiRequest) {
    if (!request.query) return null
    try {
      const moduleQuery = request.query.split('?')
      const modulePath = moduleQuery[0]
      HostLogger.log(`Call Module ${modulePath}`, [{
        key: `full:`,
        value: moduleQuery
      }, {
        key: `request:`,
        value: request
      }])

      switch (modulePath) {
        case 'server/chat':
          await ChatModule.processChat(request)
          break
        case 'server/auth':
          await AuthModule.processAuth(request)
          break
      }
    } catch (err) {
      HostLogger.error('tryProcessQuery', err)
    }
  }

  @Action
  @LogHostCall
  async onGotData (request: ApiRequest) {
    try {
      await this.tryProcessQuery(request)
    } catch (err) {
      HostLogger.error('onGotData', err)
    }
  }
}

export default getModule(ServerModule)
