<template>
  <div class="marquee">
    <span>Lorem ipsum dolor sit amet elit. Animi, aliquid.</span>

  </div>
</template>

<script setup lang="ts">
import {reactive,ref} from 'vue'

</script>

<style scoped lang="scss">
.marquee{
  display: flex;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  container-type: inline-size;
  padding: 2px 4px;
  resize: horizontal;
  width: 200px;
  background-color: salmon;
  > * {
    animation: marquee 3s linear infinite both alternate;
  }
}

@keyframes marquee{
  to{
    transform: translateX(min(100cqw - 100%,0px));
  }
}
// .marquee span {
//   animation: marquee 3s linear infinite both alternate;
// }
</style>