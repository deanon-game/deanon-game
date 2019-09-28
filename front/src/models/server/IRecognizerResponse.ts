import Message from '@/models/server/Message'

export default interface Response {
  messages: Array<Message>,
  responseToPeer: any
}
