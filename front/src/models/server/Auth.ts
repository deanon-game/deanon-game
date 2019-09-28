import IAuth from '@/models/server/IAuth'
import User from '@/models/server/User'

type Data = {
  type: 'auth'
  name: string
}

export default class Auth implements IAuth {
  caller: User
  connection: any
  data: {
    type: 'auth'
    name: string
  }
  constructor (caller: User, connection: any, data: Data = {
    type: 'auth',
    name: ''
  }) {
    this.caller = caller
    this.connection = connection
    this.data = data
  }
}
