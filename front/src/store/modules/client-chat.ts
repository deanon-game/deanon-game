import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import defaultLogo from '@/assets/anonymous.svg'
import { LogClientCall } from '@/helpers/decorators/log'
import ClientModule from '@/store/modules/client-core'
import { IClientRequest } from '@/models/client/ClientRequest'
import Message from '@/models/server/Message'

@Module({ dynamic: true, store, name: 'chat' })
class ClientChatModule extends VuexModule {
  private _messages: Message[] = []

  public isLogined: boolean = false

  public defaultLogo: any = defaultLogo

  @Mutation
  setLogin (value: boolean) {
    this.isLogined = value
  }

  get clientMessages (): Message[] {
    return this._messages
  }

  @Mutation
  @LogClientCall
  public updateMessages (messages: Message[]) {
    this._messages = messages
  }

  @Action
  @LogClientCall
  public addMyMessage (newMessage: string) {
    return new Promise((resolve) => {
      const data: IClientRequest = {
        query: 'server/chat?addMyMessage',
        data: {
          params: {
            newMessage
          }
        }
      }
      ClientModule.send(data).then(() => {
        resolve()
      })
    })
  }
  @Action
  @LogClientCall
  public renameMe (name: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const data: IClientRequest = {
          query: 'server/auth?renameMe',
          data: {
            params: {
              name
            }
          }
        }
        await ClientModule.send(data)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
  @Action
  @LogClientCall
  public loginMe (name: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.renameMe(name)
        this.setLogin(true)
        resolve(this.isLogined)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default getModule(ClientChatModule)
