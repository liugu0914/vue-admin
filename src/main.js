import App from './App.vue'
import Lockr from 'lockr'
import Vue from 'vue'
import router from './router/index.js' // 路由器
import vuetify from './plugins/vuetify'
import Tool from './utils/tool'
import './permission' // permission control



Vue.config.productionTip = false
// 工具类
Vue.prototype.$tool = Tool
// 本地存储
Vue.prototype.$lockr = Lockr


console.log('api ：' + process.env.VUE_APP_BASE_API)
console.log('app start')

/**
 *  入口函数 vue 创建 App 组件 挂载在id为app上
 */
new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount('#app')
