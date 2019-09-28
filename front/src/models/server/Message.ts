import Client from '@/models/Client'

type Avatar = null | string

export default class Message {
  public avatar: Avatar
  public client: Client
  public text: string

  constructor (client: Client, text: string, avatar: Avatar = null) {
    this.avatar = avatar
    this.client = client
    this.text = text
  }
}
