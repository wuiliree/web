<template>
  <div style="width: 100%;
          height: 100%;" ref="chartContainer">
    <div v-if="!hasNodata" ref="chartRef" style="
          width: 100%;
          height: 100%;
          position: relative;
        " />
    <div v-else>暂无数据</div>
  </div>
</template>

<script setup lang="ts">
//import NoData from '../NoData.vue'
import * as echarts from 'echarts'
import { nextTick, onMounted, ref, watch } from "vue";
import { useDebounceFn, tryOnUnmounted, useElementSize } from '@vueuse/core';

const emits = defineEmits(['onload'])
const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  }
})
const hasNodata = ref(true)


const chartRef = ref<HTMLDivElement | null>(null)
const chartContainer = ref()
let chartInstance: echarts.ECharts | null = null;
const { width, height } = useElementSize(chartContainer)  // 获取表格容器的宽高

watch(() => [width, height], useDebounceFn(() => {
  resize()
}, 500), {
  deep: true,
  immediate: true
})


watch(() => props.option, (val) => {
  hasNodata.value = Object.keys(props.option).length === 0
  if (!hasNodata.value) {
    if (chartInstance !== null) {
      // chartInstance.setOption(val, { replaceMerge: 'series' })
      chartInstance.dispose()
      chartInstance.setOption(val)
      initChart()
    } else {
      initChart()
    }
  } else {
    chartInstance && chartInstance.dispose();
    chartInstance = null;
  }
}, {
  deep: true,
  immediate: true
})

onMounted(() => {
  initChart()
})

tryOnUnmounted(() => {
  if (!chartInstance) return;
  chartInstance.dispose();
  chartInstance = null;
});

function initChart() {
  if (!hasNodata.value) {
    nextTick(() => {
      chartInstance = echarts.init(chartRef.value)
      chartInstance.setOption(props.option)
      emits('onload', chartInstance)
    })
  }
}

function resize() {
  chartInstance?.resize();
}
</script>
