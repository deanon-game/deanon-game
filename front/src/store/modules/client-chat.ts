import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import Message from '@/models/server/Message'

import defaultLogo from '@/assets/anonymous.svg'
import { LogCall } from '@/helpers/decorators/log'
import { IChatMessages } from '@/models/api/ChatMessages'

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
  public addMyMessage (message: Message) {
    // TODO: sending to server
  }
}

export default getModule(ClientChatModule)
