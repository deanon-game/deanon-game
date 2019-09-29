import store from '@/store'

import Client from '@/models/server/Client'
import IAuth from '@/models/server/IAuth'

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { has } from 'lodash-es'

type FindClientPayload = {
  auth: IAuth,
  clientId: string
}

export interface IAuthModule {
  readonly clients: { [key: string]: Client }
  addClient (auth: IAuth): void
  findClientById (id: FindClientPayload): void
  resolve (auth: IAuth): void
}
@Module({ dynamic: true, store, name: 'auth' })
export default class AuthModule extends VuexModule implements IAuthModule {
  private _clients: { [key: string]: Client } = {}

  public get clients () {
    return this._clients
  }

  @Mutation
  public addClient (auth: IAuth) {
    // this.cliens[auth.connection.connectionId] = new Client(auth)
  }

  @Action
  public findClientById (id: FindClientPayload) {
    // findClient by id
  }
  @Action
  public resolve (auth: IAuth) {
    const id: string = auth.connection.connectionId
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
}
