<template>
  <div class="vab-tabs">
    <el-tabs
      :model-value="tabActive"
      class="vab-tabs-content vab-tabs-content-smart"
      type="card"
      @tab-remove="removeTab"
      @tab-click="tabClick"
    >
      <el-tab-pane v-for="item in visitedRoutes" :key="item.name" closable :name="item.name">
        <template #label>
          <span>
            <app-icon :name="item.icon" />
            {{ item.title }}
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
      <span class="more">
        更多
        <el-icon size="16px">
          <app-icon
            :class="{ 'vab-dropdown-active': active }"
            class="vab-dropdown"
            name="arrow-down-s-line"
          />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="tabs-more">
          <el-dropdown-item command="closeOthersTabs">
            <app-icon name="close-line" />
            关闭其他
          </el-dropdown-item>
          <el-dropdown-item command="closeLeftTabs">
            <app-icon name="arrow-left-line" />
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item command="closeRightTabs">
            <app-icon name="arrow-right-line" />
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="closeAllTabs">
            <app-icon name="close-line" />
            关闭全部
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup name="LayoutTabs">
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()
const router = useRouter()

const visitedRoutes = computed(() => settingsStore.visitedRoutes)

const tabActive = computed(() => settingsStore.activeRoute)

const active = ref(false)

/**
 * @desc: 方法
 * @name: sww
 * @date: 2022-02-09
 */

const handleCommand = (command: string) => {
  switch (command) {
    case 'closeOthersTabs':
      settingsStore.deleteOtherTabs()
      break
    case 'closeLeftTabs':
      settingsStore.deleteLeftTabs()
      break
    case 'closeRightTabs':
      settingsStore.deleteRightTabs()
      break
    case 'closeAllTabs':
      settingsStore.deleteAllTabs()
      router.push('/')
      break
  }
}

const handleVisibleChange = (val: boolean) => {
  active.value = val
}

const tabClick = (event: any) => {
  settingsStore.activeRoute = event.paneName
  router.push({ name: event.paneName })
}

/*跳转最后一个标签*/
const linkToLastTab = () => {
  let lastTab = visitedRoutes.value[visitedRoutes.value.length - 1]
  settingsStore.setVisitedRoutes(lastTab)
  // 激活最后一个标签的路由
  router.push({ name: lastTab.name })
}

/*删除*/
const removeTab = (name: string) => {
  settingsStore.deleteVisitedRoutes(name)
  if (visitedRoutes.value.length === 0) {
    router.push('/')
  } else if (name === tabActive.value) {
    linkToLastTab()
  }
}
</script>

<style scoped lang="scss">
.vab-tabs {
  position: relative;
  display: flex;
  height: $base-tabs-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  background: $base-color-white;
  border-top: 1px solid #f6f6f6;
  box-sizing: border-box;
  user-select: none;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  :deep(.fold-unfold) {
    margin-right: $base-margin;
  }

  .vab-tabs-content {
    width: calc(100% - 60px);

    &-smart {
      height: $base-tag-item-height;

      :deep(.el-tabs__nav-wrap) {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $base-tag-item-height;
          line-height: $base-tag-item-height;
        }
      }

      :deep(.el-tabs__header) {
        border-bottom: 0;

        .el-tabs__nav {
          border: 0;
        }

        .el-tabs__item {
          height: $base-tag-item-height;
          margin-right: 5px;
          font-size: 12px;
          line-height: $base-tag-item-height;
          border: 0;
          transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

          &.is-active {
            background: rgba($base-color-blue, 0.1);

            &::after {
              width: 100%;
              transition: $base-transition;
            }
          }

          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: $base-color-blue;
            content: '';
            transition: $base-transition;
          }

          &:hover {
            background: rgba($base-color-blue, 0.1);

            &::after {
              width: 100%;
              transition: $base-transition;
            }
          }
        }
      }
    }
  }

  .more {
    display: flex;
    font-size: 12px;
    cursor: pointer;
    align-content: center;
    align-items: center;
  }
}
</style>
