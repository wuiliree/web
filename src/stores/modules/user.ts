import { defineStore } from "pinia";
import menu from "@/mock/menu.js"
import { keyBy } from "lodash-es"
import {router} from "@/router"
import { treeToList } from "@/utils/treeHelper";

export const userStore = defineStore({
  id:"user",
  state:() => ({
    token:"",
    tokenExpired:"", //登录令牌
    refreshToken:"",

    //路由相关
    route:{
      matched:[],
      auth:{
        added:false,
        routes:[] as any
      }
    },

    //登录相关
    isLogin:false,
    userInfo:{
      userName:"",
      userId:"",
      lastPassExpirationTime:"", //密码过期时间
      lastPwdChangeTime:"", //上次密码更改时间
      roleName:""
    },
    flatMenuObj: {}
  }),
  actions: {
    async getUserAuthRoute() {
      if (this.route.auth.routes.length <= 0) {
        this.route.auth.routes = menu
      }
      let menuArr = treeToList(this.route.auth.routes)
      const menuArrFormat = menuArr.map((v:any) => {
        let path = ""
        if (v.parentId === 0) {
          path = `/home/${v.url}`
        }else{
          const item = menuArr.find((m:any) => m.id === v.parentId)
          if (item) {
            path=`/home/${item.url}/${v.url}`
          }else{
            path = `/home/${v.url}`
          }
        }
        return {
          path,
          code:v.code
        }
      })
      this.flatMenuObj = keyBy(menuArrFormat,"path")
      return this.route.auth.routes
    },
    async setMatched(matched: any) {
      this.route.matched = matched
    }
  },
  
})