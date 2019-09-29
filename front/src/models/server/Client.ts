import User from '@/models/server/User'
import Auth from '@/models/server/Auth'
import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config'

export default class Client extends User {
  public connection: any
  constructor (state: any, authData: Auth) {
    super(authData.connection.connectionId, authData.data.name, 'client')
    this.connection = authData.connection
  }
}
