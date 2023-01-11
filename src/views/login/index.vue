<template>
  <div class="main">
    <div class="login">
      <h1>后台登录</h1>
      <el-input v-model="state.params.username" placeholder="请输入用户名" :prefix-icon="User" />
      <el-input
        v-model="state.params.password"
        type="password"
        placeholder="请输入密码"
        :prefix-icon="Lock"
      />
      <el-button @click="login">登录</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { pinia } from '@/store/plugins'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore(pinia)

const state = reactive({
  params: {
    username: 'admin',
    password: 'admin123',
  },
})

/**
 * event
 */
const login = async () => {
  let { username, password } = state.params
  if (username === 'admin' && password === 'admin123') {
    await userStore.login()
    router.replace({
      path: '/home',
    })
    ElMessage.success('欢迎admin登录后台系统')
  } else {
    ElMessage.error('用户名或密码错误')
  }
}
</script>
<style scoped lang="scss">
.main {
  background: url('https://www.861ppt.com/previews/1/2022-12-05/ht/img/loginBackground.jpg')
    no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login {
    width: 500px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 20px 30px;
    text-align: center;
    display: grid;
    grid-template-rows: 30% 25% 25% 1fr;
    h1 {
      color: white;
    }
    .el-input {
      height: 40px;
    }
    .el-button {
      cursor: pointer;
      background: #00a1ff;
      opacity: 0.8;
      text-align: center;
      color: white;
      font-size: 16px;
      line-height: 30px;
      margin: 10px 0;
      border: none;
      width: 100%;
    }
  }
}
:deep .el-input__wrapper {
  background-color: rgb(243, 243, 243) !important;
  border: none;
}
</style>
