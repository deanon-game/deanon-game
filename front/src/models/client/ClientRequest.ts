import { IData } from '@/models/api/Data'

export interface IClientRequest {
  query?: string,
  data?: IData<any, any>
}
