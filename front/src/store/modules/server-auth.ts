import store from '@/store'

import Client from '@/models/server/Client'

import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'

import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import RolesModule from '@/store/modules/server-roles'
import CoreModule from '@/store/modules/server-core'
import { has } from 'lodash-es'

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
  public addClient (client: Client) {
    console.log('added new client', client)
    this._clients[client.connection.label] = client
  }

  @Action
  public findClientById (id: FindClientPayload) {
    // findClient by id
  }
  @Action
  public registerNewClient (request: ModuleRequest<never, never>) {
    if (!CoreModule.server) return
    if (!RolesModule.hasPermission({
      caller: request.caller,
      path: 'auth.register.user'
    })) return
    console.log(`registered new client after request:`, request)
    this.addClient(new Client(request))
  }

  @Mutation
  public renameClient (request: ModuleRequest<FreeObject, FreeObject>) {
    console.log(`renameClient`, request)
    if (
      request.data.params &&
      has(request, 'data.params.name')
    ) {
      console.log(this._clients, request.connection.label)
      this._clients[request.connection.label]
        .rename(request.caller, request.data.params.name)
    }
  }

  @Action
  public updateOwnClientData (request: ModuleRequest<FreeObject, FreeObject>) {
    if (!CoreModule.server) return
    console.log(`updated client data after request:`, request)
    this.renameClient(request)
  }
  @Action
  process (request: ModuleRequest<FreeObject, FreeObject>) {
    console.log('server/auth/process')
    switch (request.data.query) {
      case 'server/auth?updateOwnClientData':
        this.updateOwnClientData(request)
        break
    }
  }
}

export default getModule(AuthModule)
