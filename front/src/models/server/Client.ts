import TRoleNames from '@/models/server/TRoleNames'
import User from '@/models/server/User'

export default class Client extends User {
  public peerId: string

  constructor (
    id: string,
    peerId: string,
    name: string | null = null,
    role?: TRoleNames
  ) {
    super(id, name, role)
    this.peerId = peerId
  }
}
