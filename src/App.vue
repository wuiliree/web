<!-- <script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
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
}
</style> -->

<template>
  <div>
    <div>
      <input placeholder="搜索" type="text" v-model="keyWord">
    </div>
    <div style="margin-top: 20px;">
      <table border cellpadding="0" cellspacing="0" width="600">
        <thead>
          <tr>
            <th>物品名称</th>
            <th>物品单价</th>
            <th>物品数量</th>
            <th>物品总价</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in searchData">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.price }}</td>
            <td align="center">
              <button @click="item.num > 1 ? item.num-- : null">-</button>
              {{ item.num }}
              <button @click="item.num < 99 ? item.num++ : null">+</button>
            </td>
            <td align="center">{{ item.num * item.price }}</td>
            <td align="center"><button @click="del(index)">删除</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" align="right">
              总价：{{ total }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, reactive, ref } from 'vue';

let keyWord = ref<string>("")
interface Data {
  name: string;
  price: number;
  num: number;
}
let data = reactive<Data[]>([
  {
    name: "小满的绿帽子",
    price: 500,
    num: 1
  },
  {
    name: "小满的衣服",
    price: 1000,
    num: 1
  },
  {
    name: "小满的裤子",
    price: 500,
    num: 1
  },
])
const searchData = computed(() => {
  return data.filter((item:Data) => {
    return item.name.includes(keyWord.value)
  })
})
const total = computed(() => {
  return data.reduce((prev: number, next: Data) => {
    return prev + next.num * next.price
  }, 0)
})
const del = (index: number) => {
  data.splice(index, 1)
}

</script>

<style scoped lang='less'></style>