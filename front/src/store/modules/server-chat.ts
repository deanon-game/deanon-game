import store from '@/store/index'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import ApiRequest from '@/models/api/ApiRequest'
import Message from '@/models/server/Message'

import defaultLogo from '@/assets/anonymous.svg'
import { LogHostCall } from '@/helpers/decorators/log'
import CoreModule from '@/store/modules/server-core'
import ApiBroadcast from '@/models/api/ApiBroacastRequest'
import { has } from 'lodash-es'
import { HostLogger } from '../../helpers/logger'

export interface IChatPermissions {
  all?: boolean
}
export interface IChatModule {
  readonly count: number
  readonly messages: Message[]
  addMyMessage (message: Message): void
}

@Module({ dynamic: true, store, name: 'serverChat' })
class ChatModule extends VuexModule implements IChatModule {
  private _messages: Message[] = []
  private _count: number = 0
  public defaultLogo: any = defaultLogo

  get count () {
    return this._count
  }
  get messages (): Message[] {
    return this._messages
  }

  @Mutation
  @LogHostCall
  private addMessage (message: Message) {
    this._messages.push(message)
  }

  @Mutation
  @LogHostCall
  private clearAllMessages () {
    this._messages = []
  }

  @Action
  @LogHostCall
  public async addMyMessage (message: Message) {
    this.addMessage(message)
    await CoreModule.broadcastChatData(new ApiBroadcast({
      messages: this.messages
    }))
  }

  @Action
  @LogHostCall
  private async processAddMyMessageRequest (request: ApiRequest) {
    // TODO: add permission check
    console.log('processAddMyMessageRequest')
    if (
      has(request, 'data.params.newMessage') &&
      typeof request.data.params.newMessage === 'string'
    ) {
      const newMessage = new Message(request.caller, request.data.params.newMessage)
      console.log('NEW Message', newMessage)
      await this.addMyMessage(newMessage)
    }
  }

  @Action
  @LogHostCall
  private async processClearAllMessages (request: ApiRequest) {
    this.clearAllMessages()
    await CoreModule.broadcastChatData(new ApiBroadcast({
      messages: this.messages
    }))
  }

  @Action
  @LogHostCall
  async processChat (request: ApiRequest) {
    try {
      if (!request) return

      switch (request.query) {
        case 'server/chat?addMyMessage':
          await this.processAddMyMessageRequest(request)
          break
        case 'server/chat?clearAllMessages':
          await this.processClearAllMessages(request)
          break
      }
    } catch (err) {
      HostLogger.error('process', err)
    }
  }
}

export default getModule(ChatModule)
