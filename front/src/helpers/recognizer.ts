import { get } from 'lodash-es'
import ModuleRequest from '@/models/common/ModuleRequest'
import FreeObject from '@/models/common/FreeObject'

// import addons from '@/addons/index'
import auth from '@/store/modules/server-auth'
import chat from '@/store/modules/server-chat'
import roles from '@/store/modules/server-roles'
import core from '@/store/modules/server-core'
import { ICoreModule, IAddonModule } from '@/models/server/Module'
import TModulesNames from '@/models/server/TModulesNames'

type ICoreModules = {
  [key in TModulesNames]: ICoreModule
}

type AnyMudule = ICoreModule | IAddonModule

const coreModules: ICoreModules = {
  'server/chat': chat,
  'server/auth': auth,
  'server/roles': roles,
  'server/core': core
}

class Recognizer implements ICoreModule {
  private _getModule (request: ModuleRequest<FreeObject, FreeObject>): AnyMudule {
    const module = get(coreModules, request.data.query, false)
    if (module) {
      return module
    }
    throw new Error(`Unable to resolve '${request.data.query}' field in AllModules`)
  }

  public process (request: ModuleRequest<FreeObject, FreeObject>) {
    this._getModule(request).process(request)
  }
}

export default new Recognizer()
