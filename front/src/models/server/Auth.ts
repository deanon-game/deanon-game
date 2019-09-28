import User from '@/models/server/User'

export default interface Auth {
  caller: User
  connection: any
  data: {
    type: 'auth'
    name: string
  }
}
