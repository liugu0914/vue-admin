import router from './router/index.js'
import Lockr from 'lockr'

// 不重定向白名单
const whiteList = ['/login', '/welcome']
router.beforeEach((to, from, next) => {
  // if (to.meta.disabled) {
  //   next(false)
  //   return
  // }
  /** 全局路由触发这个方法  如果有缓存暂时在这里交与 */
  console.log('to : ' + JSON.stringify(to))
  console.log('from : ' + JSON.stringify(from))
  const token = Lockr.get('token')
  console.log('token : ' + token)
  if (!token) {
    if (whiteList.includes(to.path)) {
      return next()
    }
    return next('/login')
  }
  return next()
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
