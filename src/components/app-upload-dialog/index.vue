<template>
  <el-dialog v-model="visible" title="导入">
    <el-upload
      ref="upload"
      :accept="accept"
      v-model:file-list="fileList"
      :action="baseURL + action"
      :limit="limit"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :on-success="handleSuccess"
      :on-error="handleEorror"
      :before-upload="handleBeforeUpload"
      :headers="header"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="AppUploadDialog">
import { ref } from 'vue'
import { ElMessage, UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
import { baseURL } from '@/config/net.config'
import { useUserStore } from '@/store/user'
import { pinia } from '@/store/plugins'

const userStore = useUserStore(pinia)

const upload = ref<UploadInstance>()
const visible = ref(false)
const fileList = ref<UploadUserFile[]>([])
const header = {
  token: userStore.token.token,
  appCode: 'distribution',
}
const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 1,
  },
  // 文件类型选择限制
  accept: {
    type: String,
    default: '.xls,.xlsx',
  },
  // 文件大小限制，单位MB,默认不限制
  size: {
    type: Number,
  },
  // 文件类型校验
  type: {
    type: String,
  },
})

defineExpose({
  show,
  close,
})

const emit = defineEmits(['refresh'])

function show() {
  if (upload.value) {
    upload.value!.clearFiles()
  }

  visible.value = true
}

function close() {
  visible.value = false
}

function handleSuccess(response: any) {
  if (response.code == 200) {
    ElMessage({
      message: '导入成功',
      type: 'success',
    })
    emit('refresh')
  } else {
    ElMessage({
      message: response.message,
      type: 'error',
    })
  }
}

const handleBeforeUpload: UploadProps['beforeUpload'] = rawFile => {
  if (props.type) {
    const aType = props.type.split(',')
    if (!aType.includes(rawFile.type)) {
      ElMessage.error('文件类型错误')
      return false
    }
  }
  if (props.size && rawFile.size > props.size * 1024 * 1024) {
    ElMessage.error(`文件不能超过${props.size}MB`)
    return false
  }
  return true
}

function submit() {
  upload.value!.submit()
  close()
}
const handleExceed: UploadProps['onExceed'] = () => {
  ElMessage({
    message: `只能导入${props.limit}个文件`,
    type: 'error',
  })
}
function handleEorror(error: Error) {
  const res = JSON.parse(error.message)
  if (res.code != 200) {
    ElMessage({
      message: res.errorDesc,
      type: 'error',
    })
  }
}
</script>

<style scoped lang="scss"></style>
