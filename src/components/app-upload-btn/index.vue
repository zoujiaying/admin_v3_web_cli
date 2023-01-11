<template>
  <el-upload
    ref="upload"
    :data="data"
    :accept="accept"
    v-model:file-list="fileList"
    :action="baseURL + action"
    :limit="limit"
    :on-exceed="handleExceed"
    :auto-upload="autoUpload"
    :on-success="handleSuccess"
    :on-error="handleEorror"
    :before-upload="handleBeforeUpload"
    :headers="header"
  >
    <template #trigger>
      <el-button type="primary">{{ btnText }}</el-button>
    </template>
  </el-upload>
</template>

<script lang="ts" setup name="appUploadBtn">
import { ref } from 'vue'
import { ElMessage, UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
import { baseURL } from '@/config/net.config'
import { useUserStore } from '@/store/user'
import { pinia } from '@/store/plugins'

const fileList = ref<UploadUserFile[]>([])
const upload = ref<UploadInstance>()
const userStore = useUserStore(pinia)
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
  autoUpload: {
    type: Boolean,
    default: true,
  },
  btnText: {
    type: String,
    default: '选择导入文件',
  },
  successText: {
    type: String,
    default: '导入成功',
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
  data: {
    type: Object,
  },
})

const emit = defineEmits(['success'])

function handleSuccess(response: any) {
  if (response.code == 200) {
    ElMessage({
      message: props.successText,
      type: 'success',
    })

    emit('success', response.data)
  } else {
    ElMessage({
      message: response.message,
      type: 'error',
    })
  }
  if (upload.value) {
    upload.value!.clearFiles()
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
