import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import { IModuleRequest } from '@/models/common/ModuleRequest'
import Message from '@/models/server/Message'

import defaultLogo from '@/assets/anonymous.svg'

export interface IChatModule {
  readonly count: number
  readonly messages: {[key: string]: Message}
  incrementCount (): void
  addMessage (message: Message): void
  resolve(request: IModuleRequest): void
}

@Module({ dynamic: true, store, name: 'chat' })
class ChatModule extends VuexModule implements IChatModule {
  private _messages: {[key: string]: Message} = {}
  private _count: number = 0
  public defaultLogo: any = defaultLogo

  get count () {
    return this._count
  }
  get messages () {
    return this._messages
  }

  @Mutation
  incrementCount () {
    this._count += 1
  }

  @Mutation
  addMessage (message: Message) {
    this._messages[this._count] = message
    this.incrementCount()
  }

  @Action
  resolve (request: IModuleRequest) {
    // const message = new Message(user2, text1, defaultLogo)
  }
}

export default getModule(ChatModule)
