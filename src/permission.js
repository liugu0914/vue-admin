import router from './router/index.js'
import Lockr from 'lockr'
import Utils from './utils/utils'

// 不重定向白名单
const whiteList = ['/login', '/main']
router.beforeEach((to, from, next) => {
  console.log('to : ')
  console.log(to)
  console.log('from : ')
  console.log(from)
  if (!to.matched.some(record => record.meta.requiresAuth || true)) {
    return next()
  }
  /** 全局路由触发这个方法  如果有缓存暂时在这里交与 */
  const token = Lockr.get('access_token')
  console.log('access_token : ' + token)
  if (!token) {
    if (Utils.contains(whiteList, to.path)) {
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
