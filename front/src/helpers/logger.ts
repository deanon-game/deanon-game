interface LoggerMessage {
  key: string,
  value: any
}

export class HostLogger {
  static log (title: string, body: LoggerMessage[]) {
    console.groupCollapsed(`%cHost: ${title}`, 'color: gold; font-weight: bold;')
    for (let item of body) {
      console.log(item.key, item.value)
    }
    console.groupEnd()
  }
  static error (title: string, body: any) {
    console.groupCollapsed(`%cHost: ${title}`, 'color: brown; font-weight: bold;')
    console.groupEnd()
    console.error(body)
  }
}

export class ClientLogger {
  static log (title: string, body: LoggerMessage[]) {
    console.groupCollapsed(`%cClient: ${title}`, 'color: aquamarine; font-weight: bold;')
    for (let item of body) {
      console.log(item.key, item.value)
    }
    console.groupEnd()
  }
  static error (title: string, body: any) {
    console.groupCollapsed(`%cClient: ${title}`, 'color: red; font-weight: bold;')
    console.error(body)
    console.groupEnd()
  }
}
