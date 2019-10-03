export function LogCall (target: Object, methodName: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value
  descriptor.value = function (...args:any) {
    const className = target.constructor.name
    let returnValue = originalMethod.apply(this, args)
    console.log(`called $store/${className}/${methodName}
    with args: ${JSON.stringify(args)}
    returned: ${JSON.stringify(returnValue)}`)
    return returnValue
  }
}
