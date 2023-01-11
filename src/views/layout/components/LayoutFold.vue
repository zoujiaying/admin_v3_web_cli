<template>
  <el-icon @click="toggleCollapse">
    <app-icon :name="collapse ? 'menu-unfold-line' : 'menu-fold-line'" class="fold-unfold" />
  </el-icon>
</template>

<script lang="ts" setup name="LayoutFold">
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

const collapse = computed(() => settingsStore.collapse)

const toggleCollapse = () => {
  settingsStore.collapse = !settingsStore.collapse
  settingsStore.collapseClick = !settingsStore.collapseClick
}
</script>

<style scoped lang="scss">
.fold-unfold {
  color: $base-color-gray;
  cursor: pointer;
}

:deep(svg) {
  display: inline-block;
  width: $base-font-size-default + 2;
  height: $base-font-size-default + 2;
  margin: 0 auto;
  overflow: hidden;
  vertical-align: middle;
  fill: currentcolor;
}
</style>
