
import axios from 'axios'
import Vue from 'vue'
import Lockr from 'lockr'
import './promise'

// 消息提示
const Toast = Vue.prototype.$toast
/**
 * 请求类型
 */
const ContentType = {
  JSON: 'application/json;charset=utf-8',
  FORM: 'application/x-www-form-urlencoded;charset=utf-8',
  MULTIPART: 'multipart/form-data;charset=utf-8'
}

// 默认JSON
axios.defaults.headers.post['Content-Type'] = ContentType.JSON
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000 // 超时时间
})

// requset拦截器
request.interceptors.request.use(
  (config) => {
  // 发送请求之前 将access_token加到header
    const access_token = Lockr.get('access_token')
    config.headers.access_token = access_token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response拦截器
request.interceptors.response.use(
  (response) => {
    const DefaultMsg = '操作失败'
    const res = response.data
    if (response.status === 200) {
      if (res.status === 200) {
        return Promise.resolve(res)
      } else {
        const message = res.message || DefaultMsg
        Toast.err(message)
        return Promise.reject(message)
      }
    } else {
      return Promise.reject(DefaultMsg)
    }
  }, (error) => {
    let msg = ''
    if (error.response) {
      const response = error.response
      if (response.status == 500) {
        msg = '服务器连接错误'
      } else if (response.data && response.data.message) {
        msg = response.data.message
      }
    }
    Toast.err(msg)
    return Promise.reject(msg)
  }
)

export { ContentType, Toast }

export default request
