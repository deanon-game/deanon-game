import RoleNames from '@/models/server/TRoleNames'
import ModuleNames from '@/models/server/TModulesNames'
import Permission from '@/models/server/TPermission'

type Permissions = {
  [Role in RoleNames]: {
    [PermissionName in ModuleNames | 'all']?: Permission | boolean
  }
}

export default Permissions
