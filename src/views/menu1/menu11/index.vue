<template>
  <div style="width: 100%;height: 100%;">
    <!-- <iframe src="/1.html" frameborder="0"  width="90%" height="800"></iframe> -->
      <!-- <WebRtc :rtspUrl="rtspUrl" :id="'video'"></WebRtc> -->
       <wTable
        :tableData="tableData"
        :columns="columns"
        :height="'70%'"
       ></wTable>
       <!-- <TextAdaptiveScroll></TextAdaptiveScroll>
       <version2></version2>
       <batteryCharge></batteryCharge> -->
       <bar style="width: 50%;height: 50%;"></bar>
  </div>
</template>

<script setup lang="ts">
import WebRtc from '@/components/WebRtc/index.vue';
import WebRtcPlay from '@/components/webrtcPlay.vue';
import { ref } from 'vue';
import wTable from "../components/table/table.vue"
import TextAdaptiveScroll from "../components/textAdaptiveScrolling/index.vue"
import version2 from "../components/textAdaptiveScrolling/version2.vue"
import batteryCharge from "../components/batteryCharge/index.vue"
import bar from "../components/bar/bar.vue"
// const rtspUrl = `rtsp://admin:abcd1234@10.100.14.153:554/h264/ch1/main/av_stream`
// const rtspSrc = ref('rtsp://admin:abcd1234@10.100.14.153:80/h264/ch1/main/av_stream')
// const rtspIp = ref('127.0.0.1')
const columns = [
    {
        label: ' 机器人 ',
        prop: 'robotCode'
    },
    {
        label: '巡检任务名称',
        prop: 'taskname'
    },
    {
        label: '预计巡检时间',
        prop: 'predicttime'
    },
    {
        label: '异常巡检点位',
        prop: 'unusualnumber'
    },
    {
        label: '剩余电量',
        prop: 'Battery',
        class: 'green'
    },
    {
        label: '设备状态',
        prop: 'charge_state',
        class: 'green',
        statusEnum: {
            true: '正在充电',
            false: '未充电',
        }
    },
    {
        label: '任务进度',
        prop: 'progress',
    }
]
const tableData = [
  {
    robotCode:'sh1',
    taskname:'巡检任务6198198418',
    predicttime:'2022-01-01',
    unusualnumber:'1',
    Battery:'100',
    charge_state:true,
    progress:'100%',
  },
  {
    robotCode:'sh2',
    taskname:'巡检任务2',
    predicttime:'2022-01-01',
    unusualnumber:'1',
    Battery:'100',
    charge_state:true,
    progress:'100%',
  }
]

// const columns = [
//   { label: 'Name', prop: 'name' },
//   { label: 'Age', prop: 'age' },
//   { label: 'Address', prop: 'address' },
// ]
// const tableData= [
//   { name: 'Tom', age: 18, address: 'New York' },
//   { name: 'Jerry', age: 20, address: 'Los Angeles' },
//   { name: 'Spike', age: 22, address: 'San Francisco' },
// ]
</script>

<style scoped>

</style>