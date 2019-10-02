import { has } from 'lodash-es'

export interface IData<P, E> {
  /* Use for Client & Host Massages */
  query: string,
  params?: P,
  extra?: E
}

export default class Data<P, E> {
  query: string = ''
  params?: P
  extra?: E

  constructor (data?: IData<P, E>) {
    if (data) {
      this.query = data.query
      if (has(data, 'params')) {
        this.params = data.params
      }
      if (has(data, 'data')) {
        this.extra = data.extra
      }
    }
  }
}
