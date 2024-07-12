<template>
  <div style="height: 100%;width:100%;">
    <iframe v-if="isOnline" style="height: 100%;width:100%;" ref="iframeWeb" class="divPlugin" :src="iframeSrc" frameborder="0"
    ></iframe>
    <div v-else class="empty">
      设备离线
    </div>
  </div>
</template>
<script>
export default {
props: {
  rtspSrc: {
    type: String,
    default: () => {
      return ''
    }
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  rtspIp:{
    type:String,
    default: () => {
      return ''
    }
  }
},
data () {
  return {
    iframeSrc: `http://127.0.0.1:5173/static/webrtc/webrtc.html`,
    aspectRatio: '',
    iframeWin:{}
  }
},
// watch: {
//   rtspSrc () {
//     this.initRtspPlay()
//   }
// },
mounted () {
  this.iframeWin = this.$refs.iframeWeb.contentWindow
  this.$refs.iframeWeb.onload = () => {
    // 一旦iframe加载完成，调用方法
    this.initRtspPlay();
  };
},
beforeDestroy() {
  console.log('destroy');
 this.iframeWin.destoryRtc()
},
methods: {
  initRtspPlay () {
    console.log('onload');
    this.iframeWin.onloadRtc(this.rtspSrc,this.rtspIp)
  },
}
}
</script>
<style>
.empty {
height: 100%;
display: flex;
align-items: center;
justify-content: center;
font-weight: 400;
font-size: 20px;
color: #999999;
}
</style>
