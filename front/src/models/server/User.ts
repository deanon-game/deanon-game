import nanoid from 'nanoid'

import TRoleNames from '@/models/server/TRoleNames'
import ServerError from '@/models/server/ServerError'
import RolesModule from '@/store/modules/server-roles'

export interface NewUserPayload {
  name?: string
  role?: TRoleNames
  id?: string
}

export interface UserDataParams {
  name: string
}

export interface IPublicUserData {
  name: string | null
  role: TRoleNames
  id?: string
}

export interface IUser extends IPublicUserData {
  readonly publicUserData: IPublicUserData
}

export default class User implements IUser {
  public name: string | null
  public role: TRoleNames
  public id: string

  constructor ({ name, role, id }: NewUserPayload) {
    this.name = name || null
    this.role = role || 'client'
    this.id = id || nanoid()
  }

  get publicUserData () {
    return {
      name: this.name,
      role: this.role,
      id: this.id
    }
  }
}
