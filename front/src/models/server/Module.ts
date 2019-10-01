import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'

export interface IAddonModule {
  process(request: ModuleRequest<FreeObject, FreeObject>): ModuleRequest<FreeObject, FreeObject>
}

export interface ICoreModule {
  process(request: ModuleRequest<FreeObject, FreeObject>): void
}
