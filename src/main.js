import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'
import wotui from './wotui'
import vantui from './vantui'
import VueClipboard from 'vue-clipboard2'
//全局引入。注册到vue原型
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.use(VueClipboard)
// 这是我们自己写的vue插件,用于循环添加 wot-design 按需引入组件
Vue.use(wotui)
Vue.use(vantui)
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
