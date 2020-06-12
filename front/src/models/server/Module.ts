import ApiRequest from '@/models/api/ApiRequest'

export interface IAddonModule {
  process(request: ApiRequest): void
}
