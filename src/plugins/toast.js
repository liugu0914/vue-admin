import Vue from 'vue'
import toast from '@/components/toast.vue'
import Vuetify from 'vuetify/lib'

const colors = {
  main: 'primary',
  suc: 'success',
  info: 'info',
  warn: 'warning',
  err: 'error'
}

/**
 * VSnackbar 配置
 */
const Default = {
  x: 'center', // default
  y: 'top', // default
  color: 'dark', // default
  icon: 'mdi-information',
  iconColor: '', // default
  classes: [
    'body-2'
  ],
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: true, // default
  closeText: '', // default
  closeIcon: 'mdi-close', // default
  closeColor: '', // default
  slot: [], // default
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
}

/**
 * 根据Vuefity-snackbar自定义toast
 * @author lyc
 * @date 2020年11月1日13:53:36
 */
class Toast {
  constructor() {
    this.property = Default.property || '$toast'
    this.queue = []
    // this.component = this.init()
    this.custome()
    return this
  }

  /**
 * ------------------------------------------------------------------------
 * Toast 初始化方法
 * ------------------------------------------------------------------------
 */
  init(options) {
    const ToastConstructor = Vue.extend(toast)
    const component = new ToastConstructor()
    const vuetifyObj = new Vuetify()
    component.$vuetify = vuetifyObj.framework
    const componentOptions = { ...Default, ...options }

    if (componentOptions.slot) {
      component.$slots.default = componentOptions.slot
      delete componentOptions.slot
    }

    Object.assign(component, componentOptions)
    document.body.appendChild(component.$mount().$el)

    return component
  }

  /**
 * ------------------------------------------------------------------------
 * 返回当前组件
 * ------------------------------------------------------------------------
 */
  getComponent() {
    return this.component
  }

  /**
 * ------------------------------------------------------------------------
 * 显示方法
 * ------------------------------------------------------------------------
 */
  show(message, options = {}) {
    if (this.component) {
      const isQueueable = options.queueable !== undefined ? options.queueable : Default.queueable

      if (isQueueable) {
        this.queue.push({ message, options })
      } else {
        this.component.close()
        this.queue.unshift({ message, options })
      }

      return
    }

    options.message = message
    this.component = this.init(options)
    this.component.$on('statusChange', (isActive, wasActive) => {
      if (wasActive && !isActive) {
        this.component.$nextTick(() => {
          this.component.$destroy()
          this.component.$el.parentNode.removeChild(this.component.$el)
          this.component = null

          if (this.queue.length) {
            const toast = this.queue.shift()
            this.show(toast.message, toast.options)
          }
        })
      }
    })
  }

  /**
 * ------------------------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------------------------
 */
  custome() {
    Object.keys(colors).forEach(color => (
      Toast.prototype[color] = (message, options = {}) =>
        this.show(message, { ...options, color: colors[color] })
    )
    )
  }

  /**
 * ------------------------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------------------------
 */
  clearQueue() {
    return this.queue.splice(0, this.queue.length)
  }

  /**
 * ------------------------------------------------------------------------
 * 组件初始化方法
 * ------------------------------------------------------------------------
 */
  static install(vue) {
    const toast = new Toast()
    vue.prototype[toast.property] = toast
    return toast
  }
}
export default Toast
