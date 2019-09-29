import Permissions from '@/models/server/TPermissions'
import Permission from '@/models/server/TPermission'
import User from '@/models/server/User'
import { get } from 'lodash-es'

interface PermissionToCheck {
  caller: User,
  path: string
}

export default {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {
    defaultPermissions (): Permission {
      return {
        all: false,
        auth: {
          all: false,
          rename: {
            own: true,
            other: false
          }
        },
        chat: {
          all: false
        },
        roles: {
          all: false
        }
      }
    },
    permissions (state: any, getters: any): Permissions {
      return {
        system: {
          all: true
        },
        owner: {
          ...getters.defaultPermissions
        },
        client: {
          ...getters.defaultPermissions
        }
      }
    }
  },
  actions: {
    hasPermission (state: any, permissionToCheck: PermissionToCheck):boolean {
      const path = `${permissionToCheck.path.replace(/\//gm, '.')}`
      const cfg = state.getters.permissions[permissionToCheck.caller.role]

      let pathArr = path.split('.')

      // find full path param
      let _path = pathArr.join('.')
      let result = get(cfg, _path, undefined)
      if (typeof result === 'boolean') return result

      // find "all" param of parrant recursive
      while (pathArr.length > 1) {
        _path = pathArr.join('.') + '.all'
        result = get(cfg, _path, undefined)
        if (typeof result === 'boolean') return result
        pathArr.pop()
      }
      // find "all" param of root
      _path = 'all'
      result = get(cfg, _path, undefined)
      if (typeof result === 'boolean') return result
      return false
    }
  }
}
