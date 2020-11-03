import Vue from 'vue'
import Vuetify, { VSnackbar, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar-ng'
// import Toast from './toast'


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

})
/**
 * VSnackbar 配置
 */
const opts = {
  $vuetify: vueObj.framework,
  x: 'center', // default
  y: 'top', // default
  color: 'success', // default
  icon: 'info',
  iconColor: '', // default
  classes: [
    'body-2'
  ],
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  closeText: '', // default
  closeIcon: 'close', // default
  closeColor: '', // default
  slot: [], // default
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
}
// 引入插件
Vue.use(VuetifyToast, opts)

Vue.use(Vuetify)


export default vueObj
