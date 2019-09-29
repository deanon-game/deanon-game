import TRoleNames from '@/models/server/TRoleNames'
import ServerError from '@/models/server/ServerError'
import $roles from '@/store/modules/'

export default class User {
  public name: string | null
  public role: TRoleNames
  public id: string

  constructor (
    id: string,
    name: string | null = null,
    role: TRoleNames = 'client'
  ) {
    this.name = name
    this.role = role
    this.id = id
  }

  public rename (store: any, caller: User, newName: string) {
    return new Promise((resolve, reject) => {
      const renameType = this.id === caller.id ? 'own' : 'other'
      store.dispatch('server/roles/hasPermission', {
        caller,
        path: `auth/rename/${renameType}`
      }).then((hasPermission: boolean) => {
        if (!hasPermission) {
          reject(new ServerError({
            message: `RenameError: Permission to change ${renameType} username was denied.`,
            caller
          }))
        }
        this.name = newName
        resolve(this)
      }).catch((e: Error) => {
        reject(e)
      })
    })
  }
}
