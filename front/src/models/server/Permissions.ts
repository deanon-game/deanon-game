import RoleNames from '@/models/server/TRoleNames'
import { IAuthPermissions } from '@/store/modules/server-auth'
import { IChatPermissions } from '@/store/modules/server-chat'
import { IRolesPermissions } from '@/store/modules/server-roles'
export interface Permission {
  all?: boolean
  AuthModule?: IAuthPermissions
  ChatModule?: IChatPermissions
  RolesModule?: IRolesPermissions
}

type Permissions = {
  [Role in RoleNames]: Permission
}

export default Permissions
