import '@/VantUI'
import 'amfe-flexible'
import 'rest-css'
import Vue from 'vue'
import VueWechatTitle from 'vue-wechat-title'
import App from './App.vue'
import router from './router'
import store from './store'
import encryption from './utis/encryption'
import axios from './utis/requst'
Vue.use(VueWechatTitle)

Vue.prototype.$http = axios
Vue.prototype.$encryption = encryption
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
