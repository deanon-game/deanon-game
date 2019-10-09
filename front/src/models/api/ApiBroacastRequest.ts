import { IChatMessages } from '@/models/api/ChatMessages'

interface IApiBroadcast {
  messages?: IChatMessages
  timestamp: Date
}

interface IApiBroadcastConstructorPayload {
  messages?: IChatMessages
  timestamp?: Date
}

export default class ApiBroadcast implements IApiBroadcast {
  messages?: IChatMessages
  timestamp: Date = new Date()
  constructor (payload: IApiBroadcastConstructorPayload) {
    if (payload.messages) {
      this.messages = { ...payload.messages }
    }
  }
}
