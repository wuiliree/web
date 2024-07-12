export { }

declare module "vue" {
  export interface GlobalComponents {
    Layout: (typeof import("./src/components/Layout.vue"))["default"]
    RouterLink: (typeof import("vue-router"))["RouterLink"]
    RouterView: (typeof import("vue-router"))["RouterView"]
  }
}