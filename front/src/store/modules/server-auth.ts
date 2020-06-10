import store from '@/store'

import Client from '@/models/server/Client'

import ApiRequest from '@/models/api/ApiRequest'

import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import CoreModule from '@/store/modules/server-core'
import ChatModule from '@/store/modules/server-chat'
import { get, has } from 'lodash-es'
import Message from '@/models/server/Message'
import { LogHostCall } from '@/helpers/decorators/log'
import { CheckPermission } from '@/helpers/decorators/check'
import Connection from '@/models/api/Connection'
import { HostLogger } from '../../helpers/logger'

export interface IAuthPermissions {
  all?: boolean
  registerNewClient?: boolean
  _renameMe?: boolean
}

export interface IAuthModule {
  readonly clients: { [key: string]: Client }
  process (request: ApiRequest): void
}

// interface FindClientData {
//   clientId: string
// }

interface IRenameClientPayload {
  client: Client,
  newName: string
}

@Module({ dynamic: true, store, name: 'auth' })
class AuthModule extends VuexModule implements IAuthModule {
  private _clients: { [key: string]: Client } = {}

  public get clients () {
    return this._clients
  }

  @Mutation
  @LogHostCall
  public rename (payload: IRenameClientPayload) {
    if (
      payload.client &&
      payload.newName
    ) {
      this._clients[payload.client.connection.label].name = payload.newName
    }
  }

  @Action
  @LogHostCall
  @CheckPermission
  private _renameMe (request: ApiRequest) {
    if (!has(request, 'data.params.name')) {
      HostLogger.error('_renameMe', 'request has no "data.params.newName"')
    }
    if (request.caller instanceof Client) {
      this.rename({
        client: request.caller,
        newName: request.data.params.name
      })
    } else {
      HostLogger.error('_renameMe', 'caller is not a Client')
    }
    const oldName = request.caller.name
    if (CoreModule.server) {
      const showMessage = new Message(
        CoreModule.server,
        `Пользователь переименовал себя ${
          oldName ? 'из "' + oldName + '"' : ''
        } в "${request.data.params.name}"`
      )
      console.log(showMessage)
      ChatModule.addMyMessage(showMessage)
    }
  }

  @Mutation
  @LogHostCall
  private _addClient (client: Client) {
    this._clients[client.connection.label] = client
  }

  @Action
  @LogHostCall
  public registerNewClient (connection: Connection) {
    if (!CoreModule.server) return
    this._addClient(new Client(connection))
  }

  @Action
  @LogHostCall
  public getClientByConnection (connection: Connection): Promise<Client | null> {
    return new Promise((resolve, reject) => {
      const label = get(connection, 'label', null)
      if (!label) return reject(Error('label not found in connection'))

      return resolve(get(this.clients, label, null))
    })
  }

  @Action
  @LogHostCall
  public process (request: ApiRequest) {
    switch (request.query) {
      case 'server/auth?renameMe':
        this._renameMe(request)
        break
    }
  }
}

export default getModule(AuthModule)
