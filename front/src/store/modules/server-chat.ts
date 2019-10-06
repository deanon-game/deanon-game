import store from '@/store/index'
import Vue from 'vue'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import ApiRequest from '@/models/api/ApiRequest'
import Message from '@/models/server/Message'
import { ICoreModule } from '@/models/server/Module'

import defaultLogo from '@/assets/anonymous.svg'
import { LogCall } from '@/helpers/decorators/log'
import CoreModule from '@/store/modules/server-core'
import { IChatMessages } from '@/models/api/ChatMessages'
import ApiBroadcast from '@/models/api/ApiBroacastRequest'
import Client from '@/models/server/Client'
import Server from '@/models/server/Server'

export interface IChatPermissions {
  all?: boolean
}
export interface IChatModule extends ICoreModule {
  readonly count: number
  readonly messages: IChatMessages
  addMyMessage (message: Message): void
}

@Module({ dynamic: true, store, name: 'chat' })
class ChatModule extends VuexModule implements IChatModule {
  private _messages: IChatMessages = {}
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
    this._count += 1
  }
  @Mutation
  @LogCall
  private addMessage (message: Message) {
    const updatedMsg = message
    if (updatedMsg.user instanceof Client) {
      delete updatedMsg.user['_connection']
    }
    if (updatedMsg.user instanceof Server) {
      delete updatedMsg.user.peer
    }
    Vue.set(this._messages, this._count, message)
  }

  @Action
  @LogCall
  public addMyMessage (message: Message) {
    // TODO: add permission check
    this.addMessage(message)
    this.incrementCount()
    CoreModule.broadcastChatData(new ApiBroadcast({
      messages: this.messages
    }))
  }

  @Action
  @LogCall
  process (request: ApiRequest) {
  }
}

export default getModule(ChatModule)
