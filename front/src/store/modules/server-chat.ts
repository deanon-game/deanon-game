import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'
import Message from '@/models/server/Message'
import { ICoreModule } from '@/models/server/Module'

import defaultLogo from '@/assets/anonymous.svg'

export interface IChatPermissions {
  all?: boolean
}
export interface IChatModule extends ICoreModule {
  readonly count: number
  readonly messages: {[key: string]: Message}
  incrementCount (): void
  addMessage (message: Message): void
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
    // TODO: add permission check
    this._messages[this._count] = message
    this.incrementCount()
  }

  @Action
  process (request: ModuleRequest<FreeObject, FreeObject>) {
    // TODO: add permission check
    return request
  }
}

export default getModule(ChatModule)
