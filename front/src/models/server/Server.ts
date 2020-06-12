import User from '@/models/server/User'
import Peer from 'peerjs'
import p2pConfig from '@/helpers/p2p.config'
import ApiRequest from '@/models/api/ApiRequest'

export default class Server extends User {
  public peer: Peer
  constructor (cb: (connection: any)=> any, id?: string) {
    const peer = new Peer(id, p2pConfig)
    super({ name: 'Система', role: 'system', id: peer.id })
    this.peer = peer
    this.peer.on('open', (id) => {
      this.id = id
    })
    this.peer.on('connection', cb)
  }
}
