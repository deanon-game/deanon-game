import store from '@/store/index'
import Vue from 'vue'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import ApiRequest from '@/models/api/ApiRequest'
import Message from '@/models/server/Message'
import { ICoreModule } from '@/models/server/Module'

import defaultLogo from '@/assets/anonymous.svg'
import { LogCall } from '@/helpers/decorators/log'

export interface IChatPermissions {
  all?: boolean
}
export interface IChatModule extends ICoreModule {
  readonly count: number
  readonly messages: {[key: string]: Message}
  addMyMessage (message: Message): void
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
  @LogCall
  private incrementCount () {
    this._count = this._count + 1
  }
  @Mutation
  @LogCall
  private addMessage (message: Message) {
    Vue.set(this._messages, this._count, message)
  }

  @Action
  @LogCall
  addMyMessage (message: Message) {
    // TODO: add permission check
    this.addMessage(message)
    this.incrementCount()
  }

  @Action
  @LogCall
  process (request: ApiRequest) {
    // TODO: add permission check
    return request
  }
}

export default getModule(ChatModule)
