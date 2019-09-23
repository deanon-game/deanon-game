import Module from './IModule'
import Request from '@/models/IRecognizerRequest'
import Response from '@/models/IRecognizerResponse'

class Chat implements Module {
  public process (request: Request):Response {
    console.log('chat', request)
    return {
      messages: [

      ]
    }
  }
}

export default new Chat()
