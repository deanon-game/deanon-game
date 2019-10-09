import { IAddonModule } from '@/models/server/Module'
import Names from '@/models/server/TModulesNames'

type IModules = {[key in Names]: IAddonModule};

export default IModules
