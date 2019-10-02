import Data, { IData } from '@/models/api/Data'
import User from '@/models/server/User'
import Connection from '@/models/common/Connection'

export interface IModuleRequest<P, E> {
  caller: User
  connection: Connection
  data?: IData<P, E>
}

export default class ModuleRequest<P, E> implements IModuleRequest<P, E> {
  data: IData<P, E> = new Data<P, E>()
  caller: User
  connection: Connection

  constructor (
    caller: User,
    connection: Connection,
    data?: IData<P, E>
  ) {
    this.caller = caller
    this.connection = connection
    if (data) {
      this.data = data
    }
  }
}
