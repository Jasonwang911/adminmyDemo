import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router/index'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
// import './permission' // permission control
import './mock' // simulation data
// axios封装引入
import { fetch, post, auth, userGet } from '@/api/api'
import { posts } from '@/api/tokenApi'

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// post 请求使用 this.$post
Vue.prototype.$post = post;
// get 请求使用 this.$get
Vue.prototype.$get = fetch;
// 用户的登录接口
Vue.prototype.$auth = auth;
// 用户的get接口
Vue.prototype.$userGet = userGet;
// 8084 的get请求
Vue.prototype.$posts = posts;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
