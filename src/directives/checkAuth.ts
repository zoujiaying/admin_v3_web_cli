import { App } from 'vue'
import { useUserStore } from '@/store/user'
import { pinia } from '@/store/plugins'

/**
 * @name: sww
 * @date: 2021-11-03
 * @desc: 验证用户按钮权限
 */
const install = (app: App) => {
  app.directive('auth', {
    mounted: (el, binding) => {
      const userStore = useUserStore(pinia)
      const visible = userStore?.currentPermission?.includes(binding.value)
      if (!visible) el.style.display = 'none'
    },
  })
}

export default install
