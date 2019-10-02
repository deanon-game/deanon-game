import User from '@/models/server/User'
import ModuleRequest from '@/models/common/ModuleRequest'
import Connection from '@/models/common/Connection'
import { get } from 'lodash-es'

export interface UserDataParams {
  name: string
}

export default class Client extends User {
  public connection: Connection
  constructor (request: ModuleRequest<never, never>) {
    super({ name: get(request.data, 'params.name', '') })
    this.connection = request.connection
  }
}
