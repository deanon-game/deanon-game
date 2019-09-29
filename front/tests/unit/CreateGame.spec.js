import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import CreateGame from '../../src/views/CreateGame'

Vue.use(Vuetify)

describe('CreateGame.vue', () => {
  const wrapper = mount(CreateGame)

  it('CreateGame contains <div>"', () => {
    expect(wrapper.contains('div')).toBe(true)
  })

  it('v-btn clicked', () => {
    wrapper.find('.create-btn').exists(true)
  })
})
