import Vue from 'vue'
import toast from '../components/toast.vue'


const colors = {
  suc: 'success',
  info: 'info',
  warn: 'warning',
  err: 'error'
}

const Default = {
  icon: '',
  color: 'dark',
  timeout: 3000,
  close: true
}
/**
 * 根据Vuefity-snackbar自定义toast
 * @author lyc
 * @date 2020年11月1日13:53:36
 */
class Toast {
  constructor(options) {
    this.config = options
    const vm = new Vue({
      render: h => h(toast)
    }).$mount()
    document.getElementById('app').appendChild(vm.$el)
    this.component = vm.$children[0]
    this.custome()
    return this
  }

  /**
 * ------------------------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------------------------
 */
  custome(options) {
    Object.keys(colors).forEach(color => (
      Toast.prototype[color] = (text, options = {}) =>
        this.component.show({ text, color: colors[color], ...Default, ...options })
    )
    )
  }

  /**
 * ------------------------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------------------------
 */
  success(text, options) {
    this.component.show({ text, ...Default, ...options })
  }

  /**
 * ------------------------------------------------------------------------
 * 组件初始化方法
 * ------------------------------------------------------------------------
 */
  static install(vue, options) {
    let toast
    if (!toast) {
      toast = new Toast(options)
    }
    vue.prototype.$toast = toast
  }
}
export default Toast
