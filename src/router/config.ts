import type { RouteRecordRaw } from 'vue-router'


export const defaultRoutes: RouteRecordRaw[] = [
  {
    path:"/",
    redirect:"/home",
    children:[
      {
        path:"home",
        name:"Home",
        component:() => import("@/components/Layout/index.vue"),
        children:[]
      },
      // {
      //   path:"login",
      //   name:"login",
      //   // component:() => 
      // },
      {
        path:"404",
        name:"notFound",
        component:() => import("@/views/404/index.vue")
      }
    ]
  }
]
