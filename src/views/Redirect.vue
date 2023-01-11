<script lang="ts" setup name="Redirect">
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const router = useRouter()
onMounted(() => {
  if (userStore.token) {
    router.replace('/home')
  } else {
    // 跳转登录页面
    router.replace('/login')
  }
})
</script>
<template>
  <div></div>
</template>
