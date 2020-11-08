import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import Toast from './toast'

/**
 * Vuetify 定义
 */
const vueObj = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#006dc9',
        secondary: '#6c757d',
        accent: '#82B1FF',
        error: '#fa5c7c',
        info: '#39afd1',
        success: '#0acf97',
        warning: '#ffbc00'
      },
      dark: {
      }
    }
  }
})
// 引入插件
Vue.use(Toast)

Vue.use(Vuetify)


export default vueObj
