import IModule from './IModule'
import Names from './IModulesNames'

type IModules = {[key in Names]: IModule};

export default IModules
