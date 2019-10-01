import store from '@/store'

import Client from '@/models/server/Client'

import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'

import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import { has } from 'lodash-es'

import RolesModule from '@/store/modules/server-roles'
import CoreModule from '@/store/modules/server-core'

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
  addClient (request: ModuleRequest<FreeObject, FreeObject>): void
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
  public addClient (request: ModuleRequest<FreeObject, FreeObject>) {
    // this.cliens[auth.connection.connectionId] = new Client(auth)
  }

  @Action
  public findClientById (id: FindClientPayload) {
    // findClient by id
  }
  @Action
  public registerNewClient (request: ModuleRequest<FreeObject, FreeObject>) {
    if (!CoreModule.server) return
    RolesModule.hasPermission({
      caller: request.caller,
      path: ''
    })
    const id: string = request.connection.connectionId
    if (has(this.clients, id)) {
      if (has(this.clients, `${id}.type`)) {
        // state.commit('updateClientData')
      }
      console.log(id)
    } else {
      this.context.commit('addClient', id)
      console.log('addClient with id = ', id)
    }
  }
  @Action
  process (request: ModuleRequest<FreeObject, FreeObject>) {
    return request
  }
}

export default getModule(AuthModule)
