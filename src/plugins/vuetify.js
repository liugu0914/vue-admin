import Vue from 'vue'
import Vuetify, { VSnackbar, VIcon } from 'vuetify/lib'
// import VuetifyToast from 'vuetify-toast-snackbar-ng'
// import Toast from './toastIndex'
import Toast from './toast'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VIcon
  }
})

/**
 * Vuetify 定义
 */
const vueObj = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
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
