<template>
  <div class="vab-nav">
    <div class="left-panel">
      <layout-fold />
      <layout-breadcrumb />
    </div>
    <div class="right-panel">
      <layout-avatar />
    </div>
  </div>
</template>

<script lang="ts" setup name="LayoutNav">
import LayoutFold from '@/views/layout/components/LayoutFold.vue'
import LayoutBreadcrumb from '@/views/layout/components/LayoutBreadcrumb.vue'
import LayoutAvatar from '@/views/layout/components/LayoutAvatar.vue'
</script>

<style scoped lang="scss">
.vab-nav {
  position: relative;
  display: flex;
  height: $base-nav-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  background: $base-color-white;
  box-shadow: $base-box-shadow;
  user-select: none;

  .left-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-items: center;
    height: $base-nav-height;

    :deep(.vab-breadcrumb) {
      margin-left: $base-margin;
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-height;
  }
}
</style>
