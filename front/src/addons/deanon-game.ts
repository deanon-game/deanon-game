import { IAddonModule } from '@/models/server/Module'
import ApiRequest from '@/models/api/ApiRequest'

class DeanonGame implements IAddonModule {
  public process (request: ApiRequest):ApiRequest {
    return request
  }
}

export default new DeanonGame()
