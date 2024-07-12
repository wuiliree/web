<template>
  <div class="header-nav">
    <div class="header-nav_first_left">
      <div 
        :class="['nav-first-item', currentRoute.path.includes(item.url) ? 'nav-first-item_active' : '']"
        v-for="(item, index) in leftNavItems" 
        :key="index" 
        @click="switchFirst(item)">
        <div class="background-img"></div>
        <span class="title">{{ item.label }}</span>
      </div>
    </div>
    <div class="header-nav_second" style="margin-top: 40px;">
      <div 
        v-for="(item,index) in secondRouters"
        @click="switchSecond(item)"
        :key="index"
        :class="['nav-second-item',currentRoute.path.includes(item.url) ? 'nav-second-item_active' : '']"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="header-nav_first_right">
      <div 
        :class="['nav-first-item', currentRoute.path.includes(item.url) ? 'nav-first-item_active' : '']"
        v-for="(item, index) in rightNavItems" 
        :key="index" 
        @click="switchFirst(item)">
        <div class="background-img"></div>
        <span class="title">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import menu from '@/mock/menu';
import { router } from '@/router';
// import { userStore } from '@/stores';
import { reactive, ref,watch } from 'vue'


// const useUserStore = userStore()
// const { routes } = useUserStore.route.auth
const routes:any = menu
const navItems = reactive(routes)
const newNavItems = splitArray(routes)
let leftNavItems = newNavItems[0]
let rightNavItems = newNavItems[1]

const currentRoute = ref({})
const secondRouters = ref([])
const rootRoute = ref({
  path: ""
})
watch(
  () => router.currentRoute.value,
  val => {
    setRoute(val)
  })

//将路由分成两份
function splitArray(array: []) {
  if(array.length<5){
    const leftArray = array
    const rightArray: any[] = []
    return [leftArray,rightArray]
  }
  else{
    const middle = Math.floor(array.length / 2)
    const leftArray = array.slice(0, middle)
    const rightArray = array.slice(middle)
    return [leftArray, rightArray]
  }
  
}

function switchFirst(item: { children: any[]; url: string }) {
  const { children, url: firstPath } = item
  if (children && children.length > 0) {
    const { url: secondPath } = children[0]
    router.push({ path: `/home/${firstPath}/${secondPath}` })
  } else {
    router.push({ path: `/home/${firstPath}` })
  }
}

function switchSecond(item:{url:string}){
  const {url:secondPath} = item
  const firstPath = rootRoute.value.url
  router.push({path:`/home/${firstPath}/${secondPath}`})
}

function setRoute(route:{path:string}){
  const root = navItems.find((item: { url: string; }) => route.path.includes(item.url))
  currentRoute.value = route
  if(root?.children && root.children.length > 0){
    secondRouters.value = root.children.filter((item: { hidden: any; }) => {
      return !item.hidden
    })
  }else{
    secondRouters.value = []
  }
  rootRoute.value = root
}
setRoute(router.currentRoute.value)

</script>

<style lang="scss" scoped>
  .header-nav{
    position: absolute;
    z-index: 100;
    width: calc(100% - 24px * 2);
    display: flex;
    top: 44px;
    justify-content: space-between;
    box-sizing: border-box;

    &_first_left,
    &_first_right{
      display: flex;
      width: calc((100% - 550px) / 2);
      .nav-first-item{
        height: 40px;
        width: 138px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;

        .title{
          font-size: 20px;
          color: #ffffff;
          z-index: 2;
          font-weight: 400;
        }
        .background-img{
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url(@/assets/images/header_nav_first.png);
          background-size: cover;
          z-index: 0;
          margin-left: -15px;
        }
      }
      .nav-first-item_active{
        .background-img{
          background-image: url(@/assets/images/header_nav_first_selected.png);
        }
        .title{
          color: #0af0fd;
          font-weight: 600;
        }
      }
    }
    &_first_right{
      justify-content: flex-end;
      .background-img{
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url(@/assets/images/header_nav_first.png);
        background-size: cover;
        z-index: 0;
        margin-left: -15px;
        // transform: scaleX(-1);
        // margin-left: 0;
        // margin-right: -15px;
        
      }
      &:nth-child(n){
        .background-img{
            transform: scaleX(-1);
            margin-left: 0;
            margin-right: -15px;
        }
      }
    }
    &_second{
      // width: 100%;
      display: flex;
      justify-content: center;

      .nav-second-item{
        height: 26px;
        background-image: url(@/assets/images/header_nav_second.png);
        min-width: 126px;
        width: fit-content;
        background-size: 100% 14px;
        background-repeat: no-repeat;
        background-position: bottom center;
        color: #ffffffcc;
        font-size: 16px;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px;

        &_active{
          color: #0af0fd;
          font-weight: 600;
          background-image: url(@/assets/images/header_nav_second_selected.png);
        }
      }
    }
  }
</style>