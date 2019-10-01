import RoleNames from '@/models/server/TRoleNames'
import ModuleNames from '@/models/server/TModulesNames'
import { IAuthPermissions } from '@/store/modules/server-auth'
import { ICorePermissions } from '@/store/modules/server-core'
import { IChatPermissions } from '@/store/modules/server-chat'
import { IRolesPermissions } from '@/store/modules/server-roles'
export interface Permission {
  all?: boolean
  auth?: IAuthPermissions
  chat?: IChatPermissions
  roles?: IRolesPermissions
  core?: ICorePermissions
}

type Permissions = {
  [Role in RoleNames]: Permission
}

export default Permissions
