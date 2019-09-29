import Vue from 'vue'
import Vuex from 'vuex'
import { IServerModule } from './modules/server-core'
import { IAuthModule } from './modules/server-auth'

Vue.use(Vuex)

export interface IRootState {
  auth: IAuthModule
  server: IServerModule
}

export default new Vuex.Store<IRootState>({})
