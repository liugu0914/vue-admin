import axios from 'axios'
/**
 * post 请求类型
 */
axios.defaults.headers.post['Content-Type'] = 'application/json'

const requset = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000 // 超时时间
})

// requset拦截器
requset.interceptors.request.use(
  (config) => {
  // 在发送请求之前做些什么
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response拦截器
requset.interceptors.response.use(
  (response) => {
  // 对响应数据做点什么
    return response
  }, (error) => {
    return Promise.reject(error)
  }
)


export default requset
