import mode from '@/helpers/mode'

export function LogCall (target: Object, methodName: string, descriptor: PropertyDescriptor) {
  if (mode.get() === 'prod') return
  let originalMethod = descriptor.value
  descriptor.value = function (...args:any) {
    const className = target.constructor.name
    let returnValue = originalMethod.apply(this, args)
    console.dir(`called $store/${className}/${methodName}
    with args:`, args,
    `\nreturned:`, returnValue)
    return returnValue
  }
}
