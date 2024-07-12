<template>
  <div class="layout-content">
    <Header />
    <div class="layout-route-view">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./header/index.vue"
import menu from "@/mock/menu.js"
import { router } from "@/router"
import { ElMessage } from "element-plus"
import { ref } from "vue";

const routes = ref()
routes.value = menu
function gotoFirstPath() {
  let path = "/"
  if (routes.value.length) {
    const first = routes.value[0] as any
    if (first.children && first.children.length) {
      path = `/home/${first.url}/${first.children[0].url}`
    } else {
      path = `/home/${first.url}`
    }
  } else {
    return ElMessage.info("您暂未分配权限，请联系管理员为您分配权限")
  }
  router.push(path)
}
gotoFirstPath();
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #081f4d;

  .layout-route-view {
    width: 100%;
    flex: 1;
    max-height: calc(100% - 130px);
  }
}
</style>