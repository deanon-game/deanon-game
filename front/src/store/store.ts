import Vue from 'vue'
import Vuex from 'vuex'
import { IServerModule } from './modules/server-core'
import { IAuthModule } from './modules/server-auth'
import { IRolesModule } from './modules/server-roles'
import { IChatModule } from './modules/server-chat'

Vue.use(Vuex)

export interface IRootState {
  auth: IAuthModule
  server: IServerModule
  roles: IRolesModule
  chat: IChatModule
}

export default new Vuex.Store<IRootState>({})
