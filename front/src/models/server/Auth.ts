import Peer from '@/models/server/Peer'

export default interface Auth {
  caller: Peer
  connection: any
  data: {
    type: 'auth'
    name: string
  }
}
