import TModulesNames from '@/addons/models/TModulesNames'
import { has } from 'lodash-es'
// import modules from './modules/index'
import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'

class Recognizer {
  private static _query (request: ModuleRequest<FreeObject, FreeObject>) {
    if (has(request, 'data.query')) {
      return request.data.query
    }
    throw new Error(`Unable to resolve 'query' field in ${request}`)
  }

  public static resolve (request: ModuleRequest<FreeObject, FreeObject>) {
    const query = this._query(request)
    if (has(modules, query)) {
      return modules[query].process(request)
    } else {
      throw new Error(`No such module '${query}' in modules object`)
    }
  }
}

export default Recognizer
