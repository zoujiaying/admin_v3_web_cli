<template>
  <component :is="getComponent(menuComponent.type)" :item="menuComponent">
    <template v-if="item.children && item.children.length">
      <layout-menu v-for="route in item.children" :key="route.name" :item="route" />
    </template>
  </component>
</template>

<script lang="ts" setup name="LayoutMenu">
  import LayoutMenuItem from '@/views/layout/components/LayoutMenuItem.vue'
  import LayoutSubmenu from '@/views/layout/components/LayoutSubmenu.vue'
  import { RouteMenu } from '@/utils/routes'
  import { PropType } from 'vue'

  const props = defineProps({
    item: {
      type: Object as PropType<RouteMenu>,
      required: true,
    },
  })

  const menuComponent = computed<RouteMenu>(() => props.item)

  const getComponent = (name) => {
    switch (name) {
      case 'MenuItem':
        return LayoutMenuItem
      case 'SubMenu':
        return LayoutSubmenu
      default:
        return LayoutMenuItem
    }
  }
</script>

<style scoped lang="scss"></style>
