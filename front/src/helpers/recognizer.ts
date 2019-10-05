import { get } from 'lodash-es'
import ApiRequest from '@/models/api/ApiRequest'

// import addons from '@/addons/index'
import auth from '@/store/modules/server-auth'
import chat from '@/store/modules/server-chat'
import roles from '@/store/modules/server-roles'
import { ICoreModule, IAddonModule } from '@/models/server/Module'
import TModulesNames from '@/models/server/TModulesNames'
import { LogCall } from '@/helpers/decorators/log'

type ICoreModules = {
  server: {
    [key in TModulesNames]: ICoreModule
  }
}

type AnyMudule = ICoreModule | IAddonModule

class Recognizer implements ICoreModule {
  private _allModules: ICoreModules = {
    server: {
      chat,
      auth,
      roles
    }
  }

  @LogCall
  private _getModule (request: ApiRequest): AnyMudule | null {
    if (!request.query) return null
    const moduleQuery = request.query.split('?')
    const modulePath = moduleQuery[0].replace('/', '.')
    console.log('try to call module with name', modulePath)
    const searchModuleResult = get(this._allModules, modulePath, null)
    return searchModuleResult
  }

  @LogCall
  public process (request: ApiRequest) {
    const mdl = this._getModule(request)
    if (!mdl) throw new Error('No such module')
    mdl.process(request)
  }
}

export default new Recognizer()
