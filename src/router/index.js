/**
 * 路由配置页面
 * @author lyc
 * @date 2020年10月27日22:41:05
 */
import Router from 'vue-router'
import Vue from 'vue'


Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(`@/views/login/login.vue`)
  }
]

export default new Router({
  mode: 'history',
  routes
})
