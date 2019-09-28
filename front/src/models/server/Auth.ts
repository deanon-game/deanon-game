import Client from '@/models/server/Client'

export default interface Auth {
  caller: Client
  connection: any
  data: {
    type: 'auth'
    name: string
  }
}
