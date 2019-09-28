import User from '@/models/server/User'
import IAuth from '@/models/server/IAuth'

export default class Client extends User {
  public connection: any
  constructor (state: any, auth: IAuth) {
    super(auth.connection.connectionId, auth.data.name)
    this.connection = auth.connection
  }
}
