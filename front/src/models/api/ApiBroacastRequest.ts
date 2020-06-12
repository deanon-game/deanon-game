import Message from '../server/Message'

interface IApiBroadcast {
  messages?: Message[]
  timestamp: Date
}

interface IApiBroadcastConstructorPayload {
  messages?: Message[]
  timestamp?: Date
}

export default class ApiBroadcast implements IApiBroadcast {
  messages?: Message[]
  timestamp: Date = new Date()
  constructor (payload: IApiBroadcastConstructorPayload) {
    if (payload.messages) {
      this.messages = [...payload.messages]
    }
  }
}
