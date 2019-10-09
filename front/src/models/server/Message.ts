import User from '@/models/server/User'
import { IPublicUserData } from './User'

type Avatar = null | string

export default class Message {
  public avatar: Avatar
  public user: IPublicUserData
  public text: string

  constructor (user: User, text: string, avatar: Avatar = null) {
    this.avatar = avatar
    this.user = user.publicUserData
    if (text.length > 0) {
      this.text = text
    } else {
      this.text = 'В слух промолчал..'
    }
  }
}
