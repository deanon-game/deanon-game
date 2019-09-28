import TModulesNames from '@/models/server/TModulesNames'
import IModules from '@/helpers/recognizer/modules/models/TModulesNames'

type AllModules = TModulesNames | IModules

export default interface IMessage<Type extends AllModules> {
  type: Type
  data?: {
    [key: string]: any
  }
}
