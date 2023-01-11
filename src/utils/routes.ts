import { RouteMeta, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import router from '@/router'

type MenuType = 'SubMenu' | 'MenuItem'

export interface RouteMenu {
  path?: string
  name?: string
  title?: string
  icon?: string
  type?: MenuType
  children?: RouteMenu[]
}

const baseMeta: RouteMeta = {
  title: '',
  keepAlive: false,
  fullPath: '',
  icon: '',
  hideChildrenInMenu: true,
  hiddenInMenu: true,
  activeMenu: '',
  matched: [],
}

const formatAsyncRoutes = (
  routes: Array<RouteRecordRaw>,
  parentMeta: RouteMeta = baseMeta,
  components: any,
  parentName = '',
  keepAliveNames: string[]
): Array<RouteRecordRaw> => {
  return routes.reduce((resultRoutes: Array<RouteRecordRaw>, route: RouteRecordRaw) => {
    route.path = `${parentMeta.fullPath ? parentMeta.fullPath + '/' : ''}${route.path}`
    /*防止出现 /abc/:id/bcd/:id   */
    route.path = route.path.replace(/\/:\w+\//, '/')
    route.name = `${parentName}${route.name as string}`
    route.meta = {
      ...baseMeta,
      fullPath: route.path,
      matched: [
        ...(parentMeta.matched as any),
        { title: route.meta?.title, path: route.path, icon: route.meta?.icon, name: route.name },
      ],
      ...route.meta,
    }
    route.meta.activeMenu = route.meta.hiddenInMenu ? parentMeta.activeMenu : route.name
    if (route.meta.keepAlive) {
      keepAliveNames.push(route.name as string)
    }
    // @ts-ignore
    if ((route.component as string) === 'Layout') {
      route.component = Layout
    } else {
      route.component = components[`..${route.component}.vue`]
    }
    if (route.children && route.children.length > 0) {
      resultRoutes = resultRoutes.concat(
        formatAsyncRoutes(route.children, route.meta, components, route.name, keepAliveNames)
      )
    }
    route.children = []
    resultRoutes.push(route)
    return resultRoutes
  }, [])
}

/*获取路由*/
export function getAsyncRoutes(routes: RouteRecordRaw[], keepAliveNames: string[] = []): string[] {
  const components = import.meta.glob('../views/**/*.vue')
  routes.forEach((moduleRoutes: RouteRecordRaw) => {
    moduleRoutes.meta = {
      ...baseMeta,
      fullPath: moduleRoutes.path,
      matched: [
        {
          title: moduleRoutes.meta?.title,
          path: moduleRoutes.path,
          icon: moduleRoutes.meta?.icon,
          name: moduleRoutes.name as string,
        },
      ],
      ...moduleRoutes.meta,
      activeMenu: moduleRoutes.name as string,
    }
    if (moduleRoutes.meta.keepAlive) {
      keepAliveNames.push(moduleRoutes.name as string)
    }
    // @ts-ignore
    if ((moduleRoutes.component as string) === 'Layout') {
      moduleRoutes.component = Layout
    } else {
      moduleRoutes.component = components[`..${moduleRoutes.component}.vue`]
    }
    if (moduleRoutes.children && moduleRoutes.children.length > 0) {
      moduleRoutes.children = formatAsyncRoutes(
        moduleRoutes.children,
        moduleRoutes.meta,
        components,
        moduleRoutes.name as string,
        keepAliveNames
      )
    }
    router.addRoute(moduleRoutes)
  })
  return keepAliveNames
}

const formatAsyncMenu = (routes: Array<RouteRecordRaw>, parentRoute: RouteMenu): RouteMenu[] => {
  return routes
    .filter((moduleRoutes: RouteRecordRaw) => {
      moduleRoutes.meta = {
        ...baseMeta,
        ...moduleRoutes.meta,
      }
      return !moduleRoutes.meta?.hiddenInMenu
    })
    .map((moduleRoutes: RouteRecordRaw) => {
      moduleRoutes.meta = {
        ...baseMeta,
        ...moduleRoutes.meta,
      }
      const menuItem: RouteMenu = {
        path: `${parentRoute.path}${moduleRoutes.path}`,
        name: `${parentRoute.name}${moduleRoutes.name as string}`,
        title: moduleRoutes.meta?.title,
        icon: moduleRoutes.meta?.icon,
        type: getMenuType(moduleRoutes),
      }
      if (
        !moduleRoutes.meta.hideChildrenInMenu &&
        moduleRoutes.children &&
        moduleRoutes.children.length > 0
      ) {
        menuItem.children = formatAsyncMenu(moduleRoutes.children, menuItem)
      }
      return menuItem
    })
}

const getMenuType = (route: RouteRecordRaw): MenuType => {
  if (route.children && route.children.length > 0) {
    return route.meta?.hideChildrenInMenu ? 'MenuItem' : 'SubMenu'
  } else {
    return 'MenuItem'
  }
}
// 获取该用户菜单的name数组
export function getMenuNames(menus: any[]): string[] {
  const menuNames: string[] = []
  const washData = mdatas => {
    const newdatas: any[] = []
    mdatas.map(item => {
      item = {
        ...item.data,
        children: washData(item.children || []),
      }
      newdatas.push(item)
      menuNames.push(item.code)
    })
    return newdatas
  }
  washData(menus)
  return menuNames
}
/*获取菜单*/
export function getAsyncMenu(routes: RouteRecordRaw[]): RouteMenu[] {
  return routes
    .filter((moduleRoutes: RouteRecordRaw) => {
      moduleRoutes.meta = {
        ...baseMeta,
        ...moduleRoutes.meta,
      }
      return !moduleRoutes.meta?.hiddenInMenu
    })
    .map((moduleRoutes: RouteRecordRaw) => {
      moduleRoutes.meta = {
        ...baseMeta,
        ...moduleRoutes.meta,
      }
      const menuItem: RouteMenu = {
        path: moduleRoutes.path,
        name: moduleRoutes.name as string,
        title: moduleRoutes.meta?.title,
        icon: moduleRoutes.meta?.icon,
        type: getMenuType(moduleRoutes),
      }
      if (
        !moduleRoutes.meta.hideChildrenInMenu &&
        moduleRoutes.children &&
        moduleRoutes.children.length > 0
      ) {
        menuItem.children = formatAsyncMenu(moduleRoutes.children, menuItem)
      }
      return menuItem
    })
}
// 按该用户菜单的name数组 过滤菜单路由
export function getSysMenus(sysMenus: any[], menuNames: string[]): any[] {
  const washMenu = pdatas => {
    const newdatas: any[] = []
    pdatas.map(item => {
      item = {
        ...item,
        children: washMenu(item.children || []),
      }
      // TODO: 把过滤先暂时去掉
      if (menuNames.indexOf(item.name) > -1 || item.meta.commonRoute) {
        newdatas.push(item)
      }
      // newdatas.push(item)
    })
    return newdatas
  }

  const menus = washMenu(sysMenus)

  return menus
}
