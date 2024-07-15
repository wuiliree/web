<template>
  <div class="wrap">
    <p title="我的宽度是正常宽度">我的宽度是正常宽度</p>
    <p class="scroll" title="我的宽度是溢出了一小部分">我的宽度是溢出了一小部分</p>
    <p class="scroll" title="我的宽度是溢出了很大一部分">我的宽度是溢出了很大一部分</p>
  </div>
</template>

<script setup lang="ts">
import {reactive,ref} from 'vue'

</script>

<style scoped lang="scss">
.wrap{
  position: relative;
  width: 150px;
  overflow: hidden;
  color: #fff;
  font-size: 16px;

}
p{
  position:relative;
  display: inline-block;
  white-space: nowrap;
  line-height: 20px;
  cursor: pointer;
  transition: .5s all;
  will-change: left,transform;
}
p:hover{
  animation: move 1.5s infinite alternate linear;
}

@keyframes move{
  0%{
    transform: translate(0,0);
  }
  100%{
    transform: translate(calc(-100% + 150px),0);
  }
}
// @keyframes move{
//   0%{
//     left: 0;
//     transform: translate(0,0);
//   }
//   100%{
//     left: 100%;
//     transform: translate(-100%,0);
//   }
// }
</style>