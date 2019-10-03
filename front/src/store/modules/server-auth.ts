import store from '@/store'

import Client from '@/models/server/Client'

import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'

import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import RolesModule from '@/store/modules/server-roles'
import CoreModule from '@/store/modules/server-core'
import ChatModule from '@/store/modules/server-chat'
import { has } from 'lodash-es'
import Message from '@/models/server/Message'
import { LogCall } from '@/helpers/decorators/log'

type DataFindClientPayload = {
  clientId: string
}

type FindClientPayload = ModuleRequest<DataFindClientPayload, never>

export interface IAuthPermissions {
  all?: boolean,
  rename?: {
    all?: boolean,
    own?: boolean,
    other?: boolean
  },
  register?: {
    all?: boolean,
    user?: boolean
  }
}

export interface IAuthModule {
  readonly clients: { [key: string]: Client }
  addClient (client: Client): void
  findClientById (id: FindClientPayload): void
  registerNewClient (request: ModuleRequest<FreeObject, FreeObject>): void
  process (request: ModuleRequest<FreeObject, FreeObject>): void
}
@Module({ dynamic: true, store, name: 'auth' })
class AuthModule extends VuexModule implements IAuthModule {
  private _clients: { [key: string]: Client } = {}

  public get clients () {
    return this._clients
  }

  @Mutation
  @LogCall
  public addClient (client: Client) {
    this._clients[client.connection.label] = client
  }

  @Action
  @LogCall
  public findClientById (id: FindClientPayload) {
    // findClient by id
  }
  @Action
  @LogCall
  public registerNewClient (request: ModuleRequest<never, never>) {
    if (!CoreModule.server) return
    if (!RolesModule.hasPermission({
      caller: request.caller,
      path: 'auth.register.user'
    })) return
    this.addClient(new Client(request))
  }

  @Mutation
  @LogCall
  public renameClient (request: ModuleRequest<FreeObject, FreeObject>) {
    if (!CoreModule.server) return
    if (
      request.data.params &&
      has(request, 'data.params.name')
    ) {
      this._clients[request.connection.label]
        .rename(request.caller, request.data.params.name)
      ChatModule.addMyMessage(
        new Message(
          CoreModule.server,
          `Поприветствуем нового пользователя с именем "${request.data.params.name}"`
        )
      )
    }
  }

  @Action
  @LogCall
  public updateOwnClientData (request: ModuleRequest<FreeObject, FreeObject>) {
    if (!CoreModule.server) return
    this.renameClient(request)
  }
  @Action
  @LogCall
  process (request: ModuleRequest<FreeObject, FreeObject>) {
    switch (request.data.query) {
      case 'server/auth?updateOwnClientData':
        this.updateOwnClientData(request)
        break
    }
  }
}

export default getModule(AuthModule)
