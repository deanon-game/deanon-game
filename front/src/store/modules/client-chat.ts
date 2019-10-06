import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import defaultLogo from '@/assets/anonymous.svg'
import { LogCall } from '@/helpers/decorators/log'
import { IChatMessages } from '@/models/api/ChatMessages'
import ClientModule from '@/store/modules/client-core'
import { IClientRequest } from '@/models/client/ClientRequest'

@Module({ dynamic: true, store, name: 'chat' })
class ClientChatModule extends VuexModule {
  private _messages: IChatMessages = {}
  public defaultLogo: any = defaultLogo

  get clientMessages (): IChatMessages {
    return this._messages
  }

  @Mutation
  @LogCall
  public updateMessages (messages: IChatMessages) {
    this._messages = messages
  }

  @Action
  @LogCall
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
}

export default getModule(ClientChatModule)
