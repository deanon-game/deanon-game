import Vue from 'vue'
import Vuetify, { VTextField, VTextarea } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VTextField,
    VTextarea
  }
})
