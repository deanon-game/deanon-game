import { has } from 'lodash-es'
import modules from './modules/index'
import IRequest from '@/models/IRecognizerRequest'
import IResponse from '@/models/IRecognizerResponse'

type Modules = 'chat' | 'auth'
class Recognizer {
  private static _type (request: IRequest): Modules {
    if (has(request, 'data.type')) {
      return request.data.type
    }
    throw new Error(`Unable to resolve 'type' field in ${request}`)
  }

  public static resolve (request: IRequest): IResponse {
    const type = this._type(request)
    if (has(modules, type)) {
      return modules[type].process(request)
    } else {
      throw new Error(`No such module '${type}' in modules object`)
    }
  }
}

export default Recognizer
