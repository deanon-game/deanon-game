import User from '@/models/server/User'

export default class ServerError extends Error {
  constructor (error:{message: string, caller: User}) {
    super('ServerError')
    console.error(error)
  }
}
