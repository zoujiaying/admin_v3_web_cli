import { vue } from '@vitejs/plugin-vue'
import { RouteRecordRaw } from 'vue-router'

const sysRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/index',
  //   name: 'Index',
  //   component: '/views/home/index.vue',
  //   meta: {
  //     title: '首页',
  //     name: 'Index',
  //     icon: undefined,
  //     // 是否支持缓存
  //     keepAlive: true,
  //     link: null,
  //     // 是否隐藏当前路由
  //     hiddenInMenu: true,
  //     activeMenu: undefined,
  //     hideChildrenInMenu: true,
  //     // 当前模块是否需要跳过验证权限，true: 不需要，false： 需要
  //     commonRoute: true,
  //   },
  // },
  {
    name: 'Home',
    path: '/home',
    redirect: '/home/index',
    component: <String>'Layout',
    meta: {
      title: '首页',
      icon: 'ri-home-3-line',
      keepAlive: false,
      link: null,
      hiddenInMenu: false,
      activeMenu: undefined,
      hideChildrenInMenu: true,
      commonRoute: true,
    },
    children: [
      {
        name: 'Index',
        path: 'index',
        component: <String>'/views/home/index',
        meta: {
          title: '',
          icon: '',
          keepAlive: true,
          link: null,
          hiddenInMenu: true,
          activeMenu: undefined,
          hideChildrenInMenu: true,
          commonRoute: true,
        },
      },
    ],
  },
  {
    name: 'Menu',
    path: '/menu',
    component: <String>'Layout',
    meta: {
      title: 'menu一级',
      icon: 'ri-home-3-line',
      keepAlive: false,
      link: null,
      hiddenInMenu: false,
      activeMenu: undefined,
      hideChildrenInMenu: false,
      // commonRoute: true,
    },
    children: [
      {
        name: 'MenuItem',
        path: 'menuItem',
        component: <String>'/views/menu/index',
        meta: {
          title: 'menu二级',
          icon: '',
          keepAlive: true,
          link: null,
          hiddenInMenu: false,
          activeMenu: undefined,
          hideChildrenInMenu: false,
          // commonRoute: true,
        },
      },
    ],
  },
]

export default sysRoutes
