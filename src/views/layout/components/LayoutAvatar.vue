<template>
  <el-dropdown @visible-change="activeChange" @command="dropMenuClick">
    <span class="avatar-dropdown">
      <el-avatar :src="avatar" class="user-avatar" />
      <div class="user-name">
        <span class="hidden-xs-only">{{ username }}</span>
        <el-icon color="#000" size="16px">
          <app-icon
            :class="{ 'vab-dropdown-active': active }"
            class="vab-dropdown"
            name="arrow-down-s-line"
          />
        </el-icon>
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- <el-dropdown-item command="personalCenter">
          <el-icon size="14px">
            <app-icon name="user-line" />
          </el-icon>
          个人信息
        </el-dropdown-item>
        <el-dropdown-item command="updatePassword">
          <el-icon size="14px">
            <app-icon name="settings-2-line" />
          </el-icon>
          修改密码
        </el-dropdown-item> -->
        <el-dropdown-item command="logout">
          <el-icon size="14px">
            <app-icon name="logout-circle-r-line" />
          </el-icon>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup name="LayoutAvatar">
import { useUserStore } from '@/store/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import defaultAvatar from '@/assets/icons/envelope.png'

const userStore = useUserStore()
const router = useRouter()

const avatar = computed(() => userStore.userInfo.account?.avatar || defaultAvatar)
const username = computed(() => userStore.userInfo.account?.name)

const active = ref(false)

/**
 * @desc: 方法
 * @name: sww
 * @date: 2022-02-09
 */
/*鼠标移入移出头像区域*/
const activeChange = (val: boolean) => {
  active.value = val
}
/*点击功能按钮*/
const dropMenuClick = (command: string) => {
  switch (command) {
    case 'logout':
      //退出登录
      ElMessageBox.confirm('是否确定退出登录系统', {
        title: '系统提醒',
      }).then(() => {
        userStore.logout()
        router.replace('/login')
        ElMessage.success('登出成功')
      })
      break
  }
}
</script>

<style scoped lang="scss">
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  .user-avatar {
    width: 30px;
    height: 30px;
    margin-left: 15px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    height: 30px;
    margin-left: 6px;
    line-height: 30px;
    cursor: pointer;

    [class*='ri-'] {
      margin-left: 0 !important;
    }
  }
}
</style>
