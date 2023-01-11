import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { routesWhiteList } from '@/config/setting.config'
import commonRoutes from '@/router/common'
import { useUserStore } from '@/store/user'
import { pinia } from '@/store/plugins'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

export const routerLoad = {
    get: () => !!localStorage.getItem('routerLoad'),
    set: () => localStorage.setItem('routerLoad', '1'),
    clear: () => localStorage.removeItem('routerLoad'),
}
routerLoad.clear()
const router = createRouter({
    history: createWebHashHistory(),
    routes: commonRoutes,
})

// 路由守卫, 后根据项目场景自定义拦截
//   // to表示将要访问的路径
//   // from表示从那个页面跳转而来
//   // next表示允许跳转到指定位置
router.beforeEach(async (to, from, next) => {
    // to.meta.matched?.some(v => {
    //     if (v.name === from.name) {
    //         v.path = from.path
    //         return true
    //     } else {
    //         return false
    //     }
    // })
    const userStore = useUserStore(pinia)
    await userStore.resetRoutes()
    NProgress.start() // start progress bar
    if (routesWhiteList.includes(to.fullPath.split('?')[0])) {
        if (userStore.token) {
            next('/home')
        } else {
            next()
        }
    } else if (userStore.token) {
        await userStore.resetRoutes()
        if (routerLoad.get()) {
            next()
        } else {
            routerLoad.set()
            next(to)
        }
    } else {
        next('/login')
    }
})
router.afterEach(() => {
    NProgress.done() // finish progress bar
})

export default router
