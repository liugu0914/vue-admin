/**
 * 路由配置页面
 * @author lyc
 * @date 2020年10月27日22:41:05
 */
import Router from 'vue-router'
import Vue from 'vue'
import path from 'path'

/**
 * 获取组件页面路径
 */
const view = path.join(__dirname, '../view')

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component : () => import(`${view}/login/login.vue`)
  }
]

export default new Router({
  mode : 'history',
  routes
})
