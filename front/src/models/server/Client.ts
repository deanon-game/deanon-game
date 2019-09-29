import User from '@/models/server/User'
import ModuleRequest from '@/models/common/ModuleRequest'
import Connection from '@/models/common/Connection'
import FreeObject from '@/models/common/FreeObject'

export interface NewUserDataParams {
  name: string
}

export default class Client extends User {
  public connection: Connection
  constructor (request: ModuleRequest<NewUserDataParams, FreeObject>) {
    super({ name: request.data.params.name })
    this.connection = request.connection
  }
}
