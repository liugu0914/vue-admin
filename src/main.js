import App from './App.vue'
import Vue from 'vue'
import router from './router/index.js' // 路由器
import vuetify from './plugins/vuetify'
import './permission' // permission control


Vue.config.productionTip = false

console.log('app start')

/**
 *  入口函数 vue 创建 App 组件 挂载在id为app上
 */
new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount('#app')
