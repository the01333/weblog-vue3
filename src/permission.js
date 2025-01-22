import router from '@/router/index'
import { getToken } from './composables/cookie'
import {
  showMessage,
  showPageLoading,
  hidePageLoading,
} from './composables/util'

/**
 * 全局路由前置守卫
 * params:
 * to: 即将要进入的目标
 * from: 当前导航正要离开的路由
 * next : 可额外添加的参数，用于手动控制跳转哪个页面
 */
router.beforeEach((to, from, next) => {
  // console.log('==> 全局路由前置守卫')

  // 展示页面加载 Loading
  showPageLoading()

  // 若用户想访问后台（以 /admin 为前缀的路由），需要先校验是否登录（是否有 Token ）
  // 如果已经登录并且再此访问登录页，提示请勿重复登录
  // 未登录，则强制跳转登录页
  let token = getToken()
  if (!token && to.path.startsWith('/admin')) {
    showMessage('请先登录', 'warning')
    next({ path: '/login' })
  } else if (token && to.path === '/login') {
    showMessage('请勿重复登录', 'warning')
    next({ path: '/admin/index' })
  } else {
    next()
  }
})

/**
 * 全局路由后置守卫
 * 对于分析、更改页面标题、声明页面等辅助功能有很大作用
 */
router.afterEach((to, from) => {
  // 动态设置页面 Title
  let title = (to.meta.title ? to.meta.title : '') + ' - Weblog'
  document.title = title

  // 隐藏页面加载 Loading
  hidePageLoading()
})
