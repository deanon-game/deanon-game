import nanoid from 'nanoid'

import TRoleNames from '@/models/server/TRoleNames'
import ServerError from '@/models/server/ServerError'
import RolesModule from '@/store/modules/server-roles'

export interface NewUserPayload {
  name?: string
  role?: TRoleNames
  id?: string
}
export default class User {
  public name: string | null
  public role: TRoleNames
  public id: string

  constructor ({ name, role, id }: NewUserPayload) {
    this.name = name || null
    this.role = role || 'client'
    this.id = id || nanoid()
  }

  public rename (store: any, caller: User, newName: string) {
    return new Promise((resolve, reject) => {
      const renameType = this.id === caller.id ? 'own' : 'other'
      const hasRenamePermission = RolesModule.hasPermission({
        caller,
        path: `auth/rename/${renameType}`
      })
      if (!hasRenamePermission) {
        reject(new ServerError({
          message: `RenameError: Permission to change ${renameType} username was denied.`,
          caller
        }))
      }
      this.name = newName
    })
  }
}
