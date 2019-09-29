import Vue from 'vue'
import Vuetify, {
  VTextField,
  VTextarea,
  VList,
  VImg,
  VCard
} from 'vuetify/lib'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VTextField,
    VTextarea,
    VList,
    VImg,
    VCard
  }
})

const opts = {}

export default new Vuetify(opts)
