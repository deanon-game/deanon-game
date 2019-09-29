import IData from '@/models/api/IData'
import User from '@/models/server/User'

export interface IModuleRequest {
  caller: User
  connection: any
  data: IData
}

export class ModuleRequest implements IModuleRequest {
  caller: User
  connection: any
  data: IData

  constructor (
    caller: User,
    connection: any,
    data: IData
  ) {
    this.caller = caller
    this.connection = connection
    this.data = data
  }
}
