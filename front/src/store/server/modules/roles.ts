import Permissions from '@/models/server/TPermissions'
import Permission from '@/models/server/TPermission'
import User from '@/models/User'
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
    hasPermission (state: any, permissionToCheck: PermissionToCheck) {
      return new Promise((resolve, reject) => {
        const path = `${permissionToCheck.caller.role}.${permissionToCheck.path.replace(/\//gm, '.')}`
        resolve(get(state.getters.permissions, path, false))
      })
    }
  }
}
