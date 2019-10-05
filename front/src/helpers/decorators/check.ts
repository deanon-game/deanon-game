import RolesModule from '@/store/modules/server-roles'
import { has, find } from 'lodash-es'
import mode from '@/helpers/mode'

export function CheckPermission (target: Object, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const className = target.constructor.name
  descriptor.value = function (...args:any) {
    const searchedArgument = find(args, (arg: any) => {
      return has(arg, 'caller')
    })
    if (!searchedArgument) {
      console.error(`any argument in `, args, `doesn't have "caller" field`)
      throw new Error(`No needed field Error`)
    }
    RolesModule.hasPermission({
      caller: searchedArgument.caller,
      path: `${className}/${methodName}`
    }).then((hasPerm) => {
      if (mode.get() === 'dev') {
        console.log(`caller`, searchedArgument.caller,
          `\n${hasPerm ? '' : 'doesn\'n'}have access to
          ${className}/${methodName}`)
      }
      if (!hasPerm) {
        console.error('access caller ', searchedArgument.caller.id, `to ${className}/${methodName} was denied.`)
        throw new Error('Permission denied.')
      }
      const returnValue = originalMethod.apply(this, args)

      return returnValue
    })
  }
}
