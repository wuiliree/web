import { userStore } from "@/stores"
import { RouteRecordRaw } from "vue-router"
import { router } from "./index"

export const beforeEachInterceptor = async (to:any,_from:any,next:any) => {
  // console.log(to);
  // debugger
  const useUserStore = userStore()
  if (to.matched.length) {
    useUserStore.setMatched(to.matched)
    // debugger
    // 已匹配路由
    return next()
  }else{
    //未匹配路由
    //权限路由设置
    let {isLogin,getUserAuthRoute,route} = useUserStore
    isLogin =true
    if (!isLogin) {
      console.log('未登录');
      
    }else{
      if(route.auth.added){
        console.log("未识别")
        return next("/404")
      }
      // 未添加过
      const authRouteData = await getUserAuthRoute()
      // console.log(authRouteData)
      
      let auRoutesGenerated:RouteRecordRaw[] = generateRoute(authRouteData)
      // console.log(auRoutesGenerated)
      for(const iterator of auRoutesGenerated){
        router.addRoute("Home",iterator)
        // console.log(iterator);
        
      }
      route.auth.added = true
      // console.log(to);
      // console.log(router.getRoutes());
      next(to)
      
      
    }
  }
}
// debugger
const views = import.meta.glob("../views/**/*.vue")
  function generateRoute(routeArray:Array<any>):RouteRecordRaw[]{
    if (routeArray.length <= 0) {
      return []
    }
    const routes: RouteRecordRaw[] = routeArray.reduce((previous,currentValue) => {
      const {name:title,url,children = [],component} = currentValue
      const routeItem:RouteRecordRaw = {
        path:url,
        meta:{title},
        children:generateRoute(children),
        component:views[".."+component]
      }
      previous.push(routeItem)
      return previous
    },[])
    return routes
  }