import request, { ContentType } from '@/utils/request.js'

/**
 *  用户授权接口
 * @author lyc
 * @date 2020-11-6
 */
const Interface = {
  /**
   * 获取授权地址
   */
  getAuthUrl: async(grantType) => {
    return await request({
      url: '/oauth',
      method: 'get',
      params: { grantType: grantType }
    })
  },
  /**
   * 后端认证
   */
  authRedirect: async(grantType, code) => {
    return await request({
      url: `/oauth/redirect/${grantType}`,
      method: 'get',
      params: { code }
    })
  },
  /**
   * 登录
   */
  login: async(data, params) => {
    params = { ...data, ...params }
    return await request({
      url: '/login',
      method: 'post',
      data,
      params,
      headers: {
        'Content-Type': ContentType.FORM
      }
    })
  },
  /**
   * 注册
   */
  register: async(params) => {
    return await request({
      url: '/register',
      method: 'POST',
      params,
      headers: {
        'Content-Type': ContentType.FORM
      }
    })
  },
  /**
   * 退出
   */
  logout: async(params) => {
    return await request({
      url: '/logout',
      method: 'get',
      data: params
    })
  }
}

export default Interface
