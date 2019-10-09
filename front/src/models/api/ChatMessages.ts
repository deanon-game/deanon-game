import Message from '@/models/server/Message'

export interface IChatMessages {
  [key: string]: Message
}
