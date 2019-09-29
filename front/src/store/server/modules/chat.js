import Message from '@/models/server/Message'

import defaultLogo from '@/assets/anonymous.svg'

export default {
  namespaced: true,
  state: {
    messages: {},
    count: 0,
    defaultLogo: defaultLogo
  },
  mutations: {
    incrementCount () {
      state.count += 1
    },
    addMessage (state, message) {
      state.messages[state.getters.count] = message
      state.commit('incrementCount')
    }
  },
  getters: {
    count (state) {
      return state.count
    },
    messages (state) {
      return state.messages
    }
  },
  actions: {
    resolve (request) {
      const message = new Message(user2, text1, defaultLogo)
    }
  }
}
