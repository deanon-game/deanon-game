import Message from '@/models/Message'

export default interface Response {
  messages: Array<Message>,
  responseToPeer: any
}
