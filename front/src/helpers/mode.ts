import defaultMode from './default-mode'

class Mode {
  constructor () {
    this.set(defaultMode)
  }
  get ():ModeValues {
    return window.$mode
  }
  set (value: ModeValues) {
    window.$mode = value
  }
}

export default new Mode()
