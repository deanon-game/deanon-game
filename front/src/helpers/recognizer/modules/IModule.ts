import Request from '@/models/IRecognizerRequest'
import Response from '@/models/IRecognizerResponse'

export default interface IModule {
  process(request: Request):Response
}
