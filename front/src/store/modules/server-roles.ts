import Permissions, { Permission } from '@/models/server/Permissions'
import User from '@/models/server/User'
import { get } from 'lodash-es'

import store from '@/store/index'
import { Module, VuexModule, Action, getModule } from 'vuex-module-decorators'

import { LogHostCall } from '@/helpers/decorators/log'

interface PermissionToCheck {
  caller: User,
  path: string
}

export interface IRolesModule {
  readonly defaultPermissions: Permission
  readonly permissions: Permissions
  hasPermission (permissionToCheck: PermissionToCheck):boolean
}

export interface IRolesPermissions {
  all?: boolean
}

@Module({ dynamic: true, store, name: 'serverRoles' })
class RolesModule extends VuexModule {
  get defaultPermissions (): Permission {
    return {
      all: false,
      AuthModule: {
        all: false,
        registerNewClient: false,
        _renameMe: true
      }
    }
  }

  get permissions (): Permissions {
    return {
      system: {
        all: true
      },
      owner: {
        ...this.defaultPermissions
      },
      client: {
        ...this.defaultPermissions
      }
    }
  }

  @Action
  @LogHostCall
  hasPermission (permissionToCheck: PermissionToCheck): Promise<boolean> {
    return new Promise((resolve) => {
      const path = permissionToCheck.path.replace('/', '.')
      const cfg = this.permissions[permissionToCheck.caller.role]

      let pathArr = path.split('.')

      // find full path param
      let _path = pathArr.join('.')
      let result = get(cfg, _path, undefined)
      if (typeof result === 'boolean') resolve(result)

      // find "all" param of parrant recursive
      while (pathArr.length > 1) {
        _path = pathArr.join('.') + '.all'
        result = get(cfg, _path, undefined)
        if (typeof result === 'boolean') resolve(result)
        pathArr.pop()
      }
      // find "all" param of root
      _path = 'all'
      result = get(cfg, _path, undefined)
      if (typeof result === 'boolean') resolve(result)
      resolve(false)
    })
  }

  process () {

  }
}

export default getModule(RolesModule)
