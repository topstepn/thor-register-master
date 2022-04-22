import Vue from 'vue'
import App from './App.vue'
import router from './plugin/router'
import store from './plugin/store'
import 'lib-flexible/flexible'
import './styles/index.less'
import './plugin/component'
import storage from './plugin/storage'
Vue.prototype.$storage = storage
import axios from './plugin/axios'
Vue.prototype.$axios = axios
import i18n from './plugin/i18n'

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
