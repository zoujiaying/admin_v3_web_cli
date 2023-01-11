<template>
  <el-sub-menu ref="subMenu" :index="menuComponent.name" :popper-append-to-body="true">
    <template #title>
      <el-icon size="16px" v-if="menuComponent.icon">
        <i :class="[menuComponent.icon]"></i>
      </el-icon>
      <span class="ml-1">
        {{ menuComponent.title }}
      </span>
    </template>
    <slot></slot>
  </el-sub-menu>
</template>

<script lang="ts" setup name="LayoutSubmenu">
  import { PropType } from 'vue'
  import { RouteMenu } from '@/utils/routes'

  const props = defineProps({
    item: {
      type: Object as PropType<RouteMenu>,
      required: true,
    },
  })

  const menuComponent = computed<RouteMenu>(() => props.item)
</script>

<style scoped lang="scss"></style>
