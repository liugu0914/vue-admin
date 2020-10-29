import App from './App.vue'
import Router from './router/index.js' // 路由器
import Vue from 'vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

/**
 *  入口函数 vue 创建 App 组件 挂载在id为app上
 */
new Vue({
  vuetify,
  Router,
  render: (h) => h(App)
}).$mount('#app')
