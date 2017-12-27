// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/css/iconfont.css'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import './common/css/index.less'
Vue.prototype.$http = axios
Vue.use(iview)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
