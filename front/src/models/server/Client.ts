import User from '@/models/server/User'
import Connection from '@/models/api/Connection'

export interface IClient {
  readonly connection: Connection
}

export default class Client extends User implements IClient {
  public _connection: Connection
  get connection () {
    return this._connection
  }
  constructor (connection: Connection) {
    super({})
    this._connection = connection
  }
}
