<template>
  <div class="logo-container logo-container-vertical">
    <router-link to="/">
      <span class="logo">
        <!-- 使用内置svg示例 -->
        <!-- <vab-icon v-if="logo" :icon="logo" is-default-svg /> -->
        <!-- 使用自定义svg示例 -->
        <app-icon v-if="logo" :name="logo" size="32px" />
      </span>
      <span class="title">
        {{ title }}
      </span>
    </router-link>
  </div>
</template>

<script lang="ts" setup name="LayoutLogo">
const title = import.meta.env.VITE_APP_TITLE
const logo = 'vuejs-fill'
</script>

<style scoped lang="scss">
@mixin container {
  position: relative;
  height: $base-top-bar-height;
  overflow: hidden;
  line-height: $base-top-bar-height;
  background: transparent;
}

@mixin logo {
  display: inline-block;
  width: 32px;
  height: 32px;
  color: $base-title-color;
  vertical-align: middle;
}

@mixin title {
  display: inline-block;
  margin-left: 5px;
  overflow: hidden;
  font-size: 20px;
  line-height: 55px;
  color: $base-title-color;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.logo-container {
  &-vertical {
    @include container;

    height: $base-logo-height;
    line-height: $base-logo-height;
    text-align: center;

    .logo {
      svg,
      img {
        @include logo;
      }
    }

    .title {
      @include title;

      max-width: $base-left-menu-width - 60;
    }
  }
}
</style>
