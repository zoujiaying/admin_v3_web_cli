<template>
  <el-container class="vab-layout-column">
    <el-aside
      :width="draggableX + 'px'"
      class="vab-layout-column__aside"
      :class="{ 'is-collapse': collapse }"
    >
      <layout-column-bar />
      <div ref="draggableRef" :style="[draggableStyle, draggableDefaultStyle]"></div>
    </el-aside>
    <el-container>
      <el-header>
        <layout-nav />
        <layout-tabs />
      </el-header>
      <el-main class="page-main">
        <el-scrollbar
          noresize
          :wrap-class="
            route.path.includes('/home/index') ? 'page-main__wrap bg-gray' : 'page-main__wrap'
          "
          view-class="page-main__content"
        >
          <el-backtop target=".page-main__wrap" />
          <app-keep-alive />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import LayoutNav from '@/views/layout/components/LayoutNav.vue'
import LayoutTabs from '@/views/layout/components/LayoutTabs.vue'
import LayoutColumnBar from '@/views/layout/components/LayoutColumnBar.vue'
import { useSettingsStore } from '@/store/settings'
import { useDraggable } from '@vueuse/core'
const route = useRoute()
const ASIDE_MIN_WIDTH = 65
const ASIDE_DEFAULT_WIDTH = 220

const settingsStore = useSettingsStore()
const collapse = computed(() => settingsStore.collapse)
const draggableRef = ref<any>(null)
const draggableDefaultStyle = {
  width: '8px',
  height: '100%',
  position: 'absolute',
  backgroundColor: 'transparent',
  zIndex: 2001,
  cursor: 'col-resize',
  userSelect: 'none',
  transform: 'translate(-50%, 0)',
}
const { style: draggableStyle, x: draggableX } = useDraggable(draggableRef, {
  exact: true,
  initialValue: {
    x: collapse.value ? ASIDE_MIN_WIDTH : ASIDE_DEFAULT_WIDTH,
    y: 0,
  },
  onMove: position => {
    if (position.x <= ASIDE_MIN_WIDTH) {
      position.x = ASIDE_MIN_WIDTH
      if (!collapse.value) settingsStore.collapse = true
    } else {
      if (collapse.value) settingsStore.collapse = false
    }
  },
  onEnd: position => {
    position.y = 0
  },
})

watch(
  () => settingsStore.collapseClick,
  () => {
    if (collapse.value) {
      draggableX.value = ASIDE_MIN_WIDTH
    } else {
      draggableX.value = ASIDE_DEFAULT_WIDTH
    }
  }
)
</script>

<style scoped lang="scss">
.vab-layout-column {
  height: 100vh;
  overflow: hidden;

  .el-header,
  .el-main {
    padding: 0;
  }

  .el-header {
    position: relative;
    z-index: $base-z-index;
    height: $base-nav-height + $base-tabs-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }

  .vab-layout-column__aside {
    position: relative;
    z-index: calc(#{$base-z-index} - 1);
    overflow: visible;

    &.is-collapse {
      border-right: 0;
    }
  }

  .page-main {
    position: relative;
    z-index: $base-z-index;
    background-color: $base-color-background;

    :deep(.page-main__wrap) {
      padding: $base-padding;
      box-sizing: border-box;
    }

    :deep(.page-main__content) {
      min-height: $base-keep-alive-height;
      padding: $base-padding;
      background-color: var(--el-color-white);
      box-sizing: border-box;
    }
  }
}
.bg-gray {
  background-color: #f6f8f7 !important;
  :deep(.page-main__content) {
    background-color: #f6f8f7 !important;
  }
}
</style>
<style lang="scss">
.bg-gray .page-main__content {
  background-color: #ffffff !important;
}
</style>
