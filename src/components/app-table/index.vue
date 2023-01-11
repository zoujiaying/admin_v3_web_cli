<template>
  <div class="app-table">
    <div class="app-table__header">
      <slot name="header"></slot>
    </div>
    <div class="app-table__content">
      <slot name="default"></slot>
    </div>
    <div class="app-table__page">
      <slot name="page"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppTable',
})
</script>

<style scoped lang="scss">
.app-table {
  display: flex;
  width: 100%;
  min-height: $main-content-height;
  flex-direction: column;

  &__page {
    width: 100%;
    padding-top: $base-padding;
    margin-top: auto;
  }
}
</style>
