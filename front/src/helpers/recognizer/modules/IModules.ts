import IModule from './IModule'
import Names from '@/models/server/TModulesNames'

type IModules = {[key in Names]: IModule};

export default IModules
