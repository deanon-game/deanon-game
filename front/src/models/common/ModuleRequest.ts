import IData from '@/models/api/IData'
import User from '@/models/server/User'
import Connection from '@/models/common/Connection'

export interface IModuleRequest<P, E> {
  caller: User
  connection: Connection
  data: IData<P, E>
}

export default class ModuleRequest<P, E> implements IModuleRequest<P, E> {
  caller: User
  connection: Connection
  data: IData<P, E>

  constructor (
    caller: User,
    connection: Connection,
    data: IData<P, E>
  ) {
    this.caller = caller
    this.connection = connection
    this.data = data
  }
}
