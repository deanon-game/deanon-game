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

export default class User {
  public name: string | null
  public role: TRoleNames
  public id: string

  constructor ({ name, role, id }: NewUserPayload) {
    this.name = name || null
    this.role = role || 'client'
    this.id = id || nanoid()
  }
}
