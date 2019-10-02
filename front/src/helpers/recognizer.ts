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
  server: {
    [key in TModulesNames]: ICoreModule
  }
}

type AnyMudule = ICoreModule | IAddonModule

class Recognizer implements ICoreModule {
  private _coreModules: ICoreModules = {
    server: {
      chat,
      auth,
      roles,
      core
    }
  }

  private _getModule (request: ModuleRequest<FreeObject, FreeObject>): AnyMudule {
    const modulePath = request.data.query.split('?')
    const moduleName = modulePath[0].replace('/', '.')
    console.log('try to call module with name', moduleName)
    const searchModuleResult = get(this._coreModules, moduleName, undefined)
    console.log(`module with name ${moduleName} is`, searchModuleResult)
    if (searchModuleResult) {
      return searchModuleResult
    }
    throw new Error(`Unable to resolve '${request.data.query}' field in AllModules`)
  }

  public process (request: ModuleRequest<FreeObject, FreeObject>) {
    console.log('recognizing request', request)
    this._getModule(request).process(request)
  }
}

export default new Recognizer()
