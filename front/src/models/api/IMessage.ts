import IData from './IData'
import AllModules from './AllModules'
export default interface IMessage<Type extends AllModules> {
  type: Type
  data?: IData
}
