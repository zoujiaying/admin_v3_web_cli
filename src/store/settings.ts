import { defineStore, acceptHMRUpdate } from 'pinia'
import { RouteMenu } from '@/utils/routes'

export const useSettingsStore = defineStore('settings', {
  persist: {
    key: 'tcs-ui-settings',
    paths: ['collapse'],
  },
  state: () => {
    return {
      collapse: false,
      collapseClick: false,
      visitedRoutes: [] as Array<RouteMenu>,
      activeRoute: '' as string | undefined,
      themeSize: 'small' as 'small' | 'default',
    }
  },
  actions: {
    setVisitedRoutes(route: RouteMenu) {
      const index = this.visitedRoutes.findIndex(item => item.name === route.name)
      if (index === -1) this.visitedRoutes.push(route)
      this.activeRoute = route.name
    },
    deleteVisitedRoutes(name: string) {
      const index = this.visitedRoutes.findIndex(item => item.name === name)
      if (index > -1) {
        this.visitedRoutes.splice(index, 1)
      }
    },
    deleteOtherTabs() {
      this.visitedRoutes = this.visitedRoutes.filter(item => item.name === this.activeRoute)
    },
    deleteLeftTabs() {
      const index = this.visitedRoutes.findIndex(item => item.name === this.activeRoute)
      this.visitedRoutes = this.visitedRoutes.filter((item, cIndex) => cIndex >= index)
    },
    deleteRightTabs() {
      const index = this.visitedRoutes.findIndex(item => item.name === this.activeRoute)
      this.visitedRoutes = this.visitedRoutes.filter((item, cIndex) => cIndex <= index)
    },
    deleteAllTabs() {
      this.visitedRoutes = []
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
