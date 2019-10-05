import Client from '@/models/server/Client'
import Server from '@/models/server/Server'
import ModuleRequest from '@/models/server/ModuleRequest'
import { IClientRequest } from '@/models/client/ClientRequest'

export default class ApiRequest extends ModuleRequest<any, any> {
  query: string

  constructor (caller: Client | Server, req: IClientRequest) {
    super(caller, req.data)
    this.query = req.query || ''
  }
}
