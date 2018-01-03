import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index.vue'
import login from '../components/login/login.vue'
import XieyiTb from '../components/xieyi-tb/xieyi-tb.vue'
import tongxunXy from '../components/tongxun-xy/tongxun-xy.vue'
import tongxunstting from '../components/tongxun-stting/tongxun-stting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/XieyiTb',
        component: XieyiTb
      }, {
        path: '/XieyiTb/:id',
        component: tongxunXy
      }, {
        path: '/TXstting',
        component: tongxunstting
      }]
    },
    {
      path: '/',
      component: login
    }
  ]
})
