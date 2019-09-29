import User from '@/models/server/User'

type Avatar = null | string

export default class Message {
  public avatar: Avatar
  public user: User
  public text: string

  constructor (user: User, text: string, avatar: Avatar = null) {
    this.avatar = avatar
    this.user = user
    this.text = text
  }
}
