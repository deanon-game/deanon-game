import User from '@/models/server/User'

export default interface IAuth {
  caller: User
  connection: any
  data: {
    type?: 'auth'
    name: string
  }
}
