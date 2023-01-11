<template>
  <div class="vab-layout-breadcrumb">
    <el-breadcrumb class="vab-breadcrumb" separator="/">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
        <a @click.prevent="handleLink(item.path)">
          <el-icon v-if="item.icon">
            <i :class="[item.icon]"></i>
          </el-icon>
          <span class="ml-1">{{ item.title }}</span>
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup name="LayoutBreadcrumb">
const route = useRoute()
const router = useRouter()
const levelList = ref<any>([])

watchEffect(() => {
  levelList.value = route.meta.matched?.filter(item => item.title)
})

const handleLink = (url: string) => {
  router.push(url)
}
</script>

<style scoped lang="scss">
.vab-breadcrumb {
  height: $base-nav-height;
  font-size: $base-font-size-default;
  line-height: $base-nav-height;

  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      a {
        display: inline-flex;
        font-weight: normal;
        color: #515a6e;
        align-items: center;
      }
    }

    &:last-child {
      .el-breadcrumb__inner {
        a {
          color: #999;
        }
      }
    }
  }
}
</style>
