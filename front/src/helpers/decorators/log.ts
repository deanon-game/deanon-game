export function LogClientCall (target: Object, methodName: string, value: PropertyDescriptor) {
  return {
    value: function (...args:any) {
      const className = target.constructor.name
      console.groupCollapsed(`%cClient: called $store/${className}/${methodName}`, 'color: aquamarine; font-weight: bold;')
      const body = [
        { key: `args:`, value: args }
      ]
      for (let item of body) {
        console.log(item.key, item.value)
      }
      let returnValue = value.value.apply(this, args)
      console.groupEnd()
      return returnValue
    }
  }
}

export function LogHostCall (target: Object, methodName: string, value: any) {
  return {
    value: function (...args:any) {
      const className = target.constructor.name
      console.groupCollapsed(`%cHost: called $store/${className}/${methodName}`, 'color: gold; font-weight: bold;')
      const body = [
        { key: `args:`, value: args }
      ]
      for (let item of body) {
        console.log(item.key, item.value)
      }
      let returnValue = value.value.apply(this, args)
      console.groupEnd()
      return returnValue
    }
  }
}
