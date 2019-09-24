import User from '@/models/User.ts'

type Avatar = null | string

export default class Message {
  public avatar: Avatar
  public user: User

  constructor (user: User, avatar: Avatar = null) {
    this.avatar = avatar
    this.user = user
  }
}
