import { has } from 'lodash-es'
import modules from './modules/index'
import TModulesNames from './modules/models/TModulesNames'
import IRequest from '@/models/server/IRecognizerRequest'
import IResponse from '@/models/server/IRecognizerResponse'

class Recognizer {
  private static _type (request: IRequest): TModulesNames {
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
