<template>
  <RouterView />
</template>

<script setup lang="ts">
// import menu from "@/mock/menu.js"
// import { router } from "@/router"
// import { ElMessage } from "element-plus"
// import { ref } from "vue";

// const routes = ref()
// routes.value = menu
// function gotoFirstPath() {
//   let path = "/"
//   if (routes.value.length) {
//     const first = routes.value[0] as any
//     if (first.children && first.children.length) {
//       path = `/home/${first.url}/${first.children[0].url}`
//     } else {
//       path = `/home/${first.url}`
//     }
//   } else {
//     return ElMessage.info("您暂未分配权限，请联系管理员为您分配权限")
//   }
//   router.push(path)
// }
// gotoFirstPath();
</script>

<style scoped>

/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
