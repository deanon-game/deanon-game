import IModule from './models/IModule'
import Names from '@/models/server/TModulesNames'

type IModules = {[key in Names]: IModule};

export default IModules
