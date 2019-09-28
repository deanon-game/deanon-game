import Module from './IModule'
import Request from '@/models/server/IRecognizerRequest'
import Response from '@/models/server/IRecognizerResponse'

class Auth implements Module {
  public process (request: Request):Response {
    console.log('auth', request)
    return {
      messages: [],
      responseToPeer: {}
    }
  }
}

export default new Auth()
