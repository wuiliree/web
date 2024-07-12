import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); //透视相机
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 ); //正交相机

const renderer = new THREE.WebGLRenderer(
  // {
  //   antialias: true, // true/false表示是否开启反锯齿
  //   alpha: true, // true/false 表示是否可以设置背景色透明
  //   precision: 'highp', // highp/mediump/lowp 表示着色精度选择
  //   premultipliedAlpha: false, // true/false 表示是否可以设置像素深度（用来度量图像的分率）
  //   preserveDrawingBuffer: true, // true/false 表示是否保存绘图缓冲
  //   maxLights: 3, // 最大灯光数
  //   stencil: false // false/true 表示是否使用模板字体或图案
  // }
);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);