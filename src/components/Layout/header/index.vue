<template>
  <div class="header">
    <div class="header-title title">
      <div class="header-title_left">
        <div class="left-wrapper"></div>
      </div>
      <div class="header-title_center">
        测试组件页面
        <img src="@/assets/images/header_title_bg.png" class="header-title_bg">
      </div>
      <div class="header-title_right">
        <div class="right-wrapper"></div>
      </div>
    </div>
    <HeaderNav></HeaderNav>
  </div>
</template>

<script setup lang="ts">
import HeaderNav from './HeaderNav.vue';

</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: relative;
  padding: 0 24px;
  box-sizing: border-box;

  .header-title {
    width: 100%;
    display: flex;
    z-index: 99;
    position: relative;
    min-height: 115px;

    &_left,
    &_right {
      flex: 1;
      height: 42px;
      padding-top: 10px;
    }

    &_center {
      background: linear-gradient(180deg, #eaf9ff 0%, #9fc7ff 53%, #0086e5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
      line-height: 42px;
      // letter-spacing: 4px;
      font-size: 31px;
      padding-top: 12px;
      color: #0086e5ff;
      letter-spacing: -2px;
    }

    &_bg {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      display: block;
      height: 65px;
      z-index: -1;
      width: 625px;
    }
  }
}
</style>