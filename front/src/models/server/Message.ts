import Peer from '@/models/server/Peer'

type Avatar = null | string

export default class Message {
  public avatar: Avatar
  public client: Peer
  public text: string

  constructor (client: Peer, text: string, avatar: Avatar = null) {
    this.avatar = avatar
    this.client = client
    this.text = text
  }
}
