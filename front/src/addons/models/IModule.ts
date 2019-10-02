import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'
export default interface IModule<P, E> {
  process(request: ModuleRequest<P, E>):ModuleRequest<FreeObject, FreeObject>
}
