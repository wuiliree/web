import "./style.css"
import { createApp } from 'vue'
import App from './App.vue'
import {setupRouter} from './router/index'
import { setupStore } from './stores'
import { registerComponent } from "@/components/registerComponent"

const app = createApp(App)

//注册路由
setupRouter(app)

// 注册全局组件
registerComponent(app)

//注册store
setupStore(app)

app.mount('#app')
