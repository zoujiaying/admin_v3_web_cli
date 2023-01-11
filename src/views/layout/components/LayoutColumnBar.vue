<template>
  <div class="van-layout-column-bar">
    <el-scrollbar
      :class="{
        'is-collapse': collapse,
      }"
      class="vab-side-bar"
    >
      <layout-logo />
      <el-menu
        :collapse="collapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        :default-openeds="defaultOpends"
        :unique-opened="uniqueOpened"
        menu-trigger="click"
        mode="vertical"
        @select="menuChange"
      >
        <template v-for="item in asyncMenu" :key="item.name">
          <layout-menu :item="item" />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup name="LayoutColumnBar">
  import LayoutLogo from '@/views/layout/components/LayoutLogo.vue'
  import LayoutMenu from '@/views/layout/components/LayoutMenu.vue'
  import { useSettingsStore } from '@/store/settings'
  import { useUserStore } from '@/store/user'
  import { RouteMenu } from '@/utils/routes'
  import _ from 'lodash'

  const settingsStore = useSettingsStore()
  const userStore = useUserStore()
  const route = useRoute()
  const router = useRouter()

  const defaultOpends = ref([])
  const uniqueOpened = ref(false)
  const collapse = computed(() => settingsStore.collapse)
  const asyncMenu = computed(() => userStore.asyncMenu)
  const activeMenu = computed(() => route.meta.activeMenu)

  watch(
    route,
    () => {
      if (route.meta.keepAlive && route.meta.title) {
        const menuInfo: RouteMenu = {
          title: route.meta.title,
          name: route.name as string,
          path: route.path,
          icon: route.meta.icon,
        }
        settingsStore.setVisitedRoutes(menuInfo)
      } else if (route.meta.keepAlive) {
        const matched: any = _.findLast(route.meta.matched, (item) => item.title)
        if (matched) {
          const menuInfo: RouteMenu = {
            title: matched.title,
            name: matched.name,
            path: matched.path,
            icon: matched.icon,
          }
          settingsStore.setVisitedRoutes(menuInfo)
        } else {
          settingsStore.activeRoute = ''
        }
      } else {
        settingsStore.activeRoute = ''
      }
    },
    {
      immediate: true,
    },
  )

  /**
   * @desc: 方法
   * @name: sww
   * @date: 2022-02-10
   */
  const menuChange = (index: string) => {
    router.push({
      name: index,
    })
  }
</script>

<style scoped lang="scss">
  @mixin active {
    &.is-active {
      color: var(--el-color-white);
      background-color: var(--el-color-primary) !important;
    }
  }

  :deep(.vab-side-bar) {
    position: relative;
    z-index: $base-z-index;
    height: 100vh;
    min-width: $base-left-menu-width;
    overflow: hidden;
    background: $base-menu-background;
    box-shadow: $base-box-shadow;

    .el-menu {
      border: none;
    }

    .el-popper.is-light {
      border: none;
    }

    .el-menu-item {
      @include active;
    }
  }

  :deep(.vab-side-bar.is-collapse) {
    width: $base-left-menu-width-min;
    min-width: auto;
    border-right: 0;

    .el-sub-menu.is-active {
      @include active;
    }
  }
  :deep(.el-menu-item):hover {
    background-color: #5f6a8181;
  }
  :deep(.el-sub-menu__title):hover {
    background-color: #5f6a8181;
  }
</style>
