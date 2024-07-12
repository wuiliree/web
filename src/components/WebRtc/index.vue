<template>
  <!-- <div class="video-container"> -->
    <video :id='id' class="video-element" style='object-fit: contain; width: 100%;height:98%;background-color: #333;' autoplay autobuffer muted
    preload='auto'></video>
  <!-- </div> -->
</template>

<script setup lang='ts'>
import WebRtcStreamer from './webrtcstreamer'
import { watch, nextTick, onMounted, ref, onBeforeUnmount } from 'vue';
// import { systemStore } from '@/store/modules/system';

const props = withDefaults(defineProps<{
  rtspUrl: string,
  id: string
}>(), {
  rtspUrl: '',
  id: 'video'
})

let webRtcServer: any = null
watch(() => props.rtspUrl, () => {
  init()
  window.addEventListener('beforeunload', handleBeforeUnload)
}, {
  immediate: true
})

const webrtcServer = ref()

onMounted(() => {
  
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  handleBeforeUnload()
})

function init() {
  nextTick(() => {
    if (!props.rtspUrl) return;
    if (!webRtcServer) {
      webRtcServer = new WebRtcStreamer(props.id, location.protocol +'//127.0.0.1:8000')
      webRtcServer.onError = (error) => {
        console.error('WebRTC error:', error);
      };
    };
    // 需要查看的rtsp地址		
    webRtcServer.connect(props.rtspUrl)
    
  })
}

function handleBeforeUnload() {
  console.log('disconnect');
  webRtcServer.disconnect();
}
</script>

<style></style>