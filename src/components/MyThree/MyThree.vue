<template>
  <div id="webgl" style=""></div>
</template>

<script setup lang="ts">
import { onMounted} from 'vue'
import * as THREE from 'three'
// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const threeObj = { // 与three相关的不做响应式，否则会导致模型加载失败
    camera: {} as THREE.PerspectiveCamera,
    scene: {} as THREE.Scene,
    controls: {} as OrbitControls,
    renderer: {} as THREE.WebGLRenderer,
    ambientLight:{} as THREE.AmbientLight,
    animationFrame: {},
    cube:{} as THREE.Mesh,
    width: 0,
    height: 0
}


const setCamera = () => {
  // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
  threeObj.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  threeObj.camera.position.z=5
}
//设置渲染器
const setRenderer = () => {
  threeObj.renderer = new THREE.WebGLRenderer()
  //设置画布打小
  threeObj.renderer.setSize(window.innerWidth,window.innerHeight)
  document.getElementById('webgl')?.appendChild(threeObj.renderer.domElement)
}
//设置环境光
const setLight = () => {
  threeObj.ambientLight = new THREE.AmbientLight(0xffffff)
  threeObj.scene.add(threeObj.ambientLight)
}

const init = () => {
  threeObj.scene = new THREE.Scene()
  setCamera()
  setCamera()
  setRenderer()
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({color:0x00ff00})
  const cube = new THREE.Mesh(geometry,material)
  threeObj.scene.add(cube)
  render()
  // setLight()
}
const render = () => {
  threeObj.renderer.render(threeObj.scene,threeObj.camera)
}

onMounted(() => {
  init()
})
</script>

<style scoped></style>