import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'

Vue.use(Router)
Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
