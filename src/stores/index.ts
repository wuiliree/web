import { createPinia } from "pinia";
import { App } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { userStore } from "./modules/user";

const pinia = createPinia()

export function setupStore(app:App<Element>) {
  pinia.use(({store}) => {
    const initialState = JSON.parse(JSON.stringify(store.$state))
    store.$reset = () => {
      store.$state = JSON.parse(JSON.stringify(initialState))
    }
  })
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}

export {pinia,userStore}