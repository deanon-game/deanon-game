import IModule from './models/IModule'
import Names from '@/models/server/TModulesNames'
import FreeObject from '@/models/common/FreeObject'

type IModules = {[key in Names]: IModule<FreeObject, FreeObject>};

export default IModules
