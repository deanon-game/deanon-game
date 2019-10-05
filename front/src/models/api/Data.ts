import { has } from 'lodash-es'

export interface IData<P, E> {
  /* Use for Client & Host Massages */
  params?: P,
  extra?: E
}

export default class Data<P, E> {
  params?: P
  extra?: E

  constructor (data?: IData<P, E>) {
    if (data) {
      if (has(data, 'params')) {
        this.params = data.params
      }
      if (has(data, 'data')) {
        this.extra = data.extra
      }
    }
  }
}
