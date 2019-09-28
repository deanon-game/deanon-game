import Request from '@/models/server/IRecognizerRequest'
import Response from '@/models/server/IRecognizerResponse'

export default interface IModule {
  process(request: Request):Response
}
