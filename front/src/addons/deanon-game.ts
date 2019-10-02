import IModule from './models/IModule'
import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'

class DeanonGame implements IModule<FreeObject, FreeObject> {
  public process (request: ModuleRequest<FreeObject, FreeObject>):ModuleRequest<FreeObject, FreeObject> {
    console.log('deanonGame', request)
    return request
  }
}

export default new DeanonGame()
