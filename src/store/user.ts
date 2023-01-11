import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAsyncMenu, getAsyncRoutes, RouteMenu, getMenuNames, getSysMenus } from '@/utils/routes'
import sysRoutes from '@/router/routes'

export const useUserStore = defineStore('user', {
  persist: {
    key: 'tcs-ui-user',
    paths: ['token', 'userInfo', 'menuNames'],
  },
  state: () => {
    return {
      token: '',
      userInfo: {
        menus: [
          {
            children: [
              {
                children: [],
                data: {
                  code: 'Index',
                  createTime: '2023-01-01 11:33:57',
                  createUser: '',
                  id: 152,
                  isDelete: 0,
                  name: '首页',
                  parentCode: 'Home',
                  permissionCode: 'Home:Index',
                  type: 1,
                  updateTime: '2023-01-01 11:33:57',
                  updateUser: '',
                  url: null,
                },
              },
            ],
            data: {
              code: 'Home',
              createTime: '2023-01-01 11:33:57',
              createUser: '',
              id: 1,
              isDelete: 0,
              name: '首页',
              parentCode: 'root',
              permissionCode: 'admin:Home',
              type: 0,
              updateTime: '2023-01-01 14:20:02',
              updateUser: '',
              url: null,
            },
          },
          {
            children: [
              {
                children: [],
                data: {
                  code: 'MenuItem',
                  createTime: '2023-01-01 11:33:57',
                  createUser: '',
                  id: 152,
                  isDelete: 0,
                  name: 'menu二级',
                  parentCode: 'Menu',
                  permissionCode: 'Menu:MenuItem',
                  type: 1,
                  updateTime: '2023-01-01 11:33:57',
                  updateUser: '',
                  url: null,
                },
              },
            ],
            data: {
              code: 'Menu',
              createTime: '2023-01-01 11:33:57',
              createUser: '',
              id: 1,
              isDelete: 0,
              name: 'menu一级',
              parentCode: 'root',
              permissionCode: 'admin:Menu',
              type: 0,
              updateTime: '2023-01-01 14:20:02',
              updateUser: '',
              url: null,
            },
          },
        ],
      },
      asyncMenu: [] as RouteMenu[],
      roleList: [] as ObjectType[],
      menuNames: [] as string[],
      keepAliveNames: [] as string[],
      currentPermission: [] as string[],
    }
  },
  actions: {
    async resetRoutes() {
      try {
        const menuNames = getMenuNames(JSON.parse(JSON.stringify(this.userInfo.menus)))
        if (menuNames.toString() == this.menuNames.toString()) {
          return
        }
        // 获取全部路由数据
        const userRoutes = getSysMenus(sysRoutes, menuNames)
        // console.log(userRoutes, 'userRoutesuserRoutes')

        // 获取name值数组，用来处理缓存
        this.keepAliveNames = getAsyncRoutes(JSON.parse(JSON.stringify(userRoutes)))
        // console.log(this.keepAliveNames, 'this.keepAliveNames')

        // 获取左侧菜单，用来渲染左侧栏
        this.asyncMenu = getAsyncMenu(JSON.parse(JSON.stringify(userRoutes)))
        // console.log(this.asyncMenu, 'this.asyncMenu')
      } catch (e) {
        return e
      }
    },
    // 后期加上登录接口
    async login() {
      this.token = String(Date.now() + Math.random() * 100)
    },
    // 后期加上退出登录接口
    async logout() {
      this.token = ''
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
