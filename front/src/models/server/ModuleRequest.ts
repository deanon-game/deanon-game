import Data, { IData } from '@/models/api/Data'
import Client from '@/models/server/Client'
import Server from '@/models/server/Server'

export interface IModuleRequest<P, E> {
  caller: Client | Server
  data?: IData<P, E>
}

export default class ModuleRequest<P, E> implements IModuleRequest<P, E> {
  data: IData<P, E> = new Data<P, E>()
  caller: Client | Server

  constructor (
    caller: Client | Server,
    data?: IData<P, E>
  ) {
    this.caller = caller
    if (data) {
      this.data = data
    }
  }
}
