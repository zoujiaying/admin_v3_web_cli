<template>
  <el-menu-item :index="menuComponent.name">
    <el-icon size="16px" v-if="menuComponent.icon">
      <i :class="[menuComponent.icon]"></i>
    </el-icon>
    <span class="ml-1">
      {{ menuComponent.title }}
    </span>
  </el-menu-item>
</template>

<script lang="ts" setup name="LayoutMenuItem">
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
