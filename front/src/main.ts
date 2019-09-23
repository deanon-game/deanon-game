import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
