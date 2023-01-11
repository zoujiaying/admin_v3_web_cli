import { useUserStore } from '@/store/user'
import { pinia } from '@/store/plugins'

export default function (authList: string[]) {
  const userStore = useUserStore(pinia)
  const { currentPermission } = userStore
  if (currentPermission) {
    return authList.map(item => currentPermission.includes(item))
  }
}
