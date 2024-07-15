<template>
  <div ref="chartRef" style="height: 100%; width: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

// 引用chartRef
const chartRef = ref<HTMLDivElement | null>(null);

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '直接访问',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideTop',
        offset:[55,-10],
        color:'#fff'
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideTop',
        offset:[55,-10],
        color:'#fff'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideTop',
        offset:[55,-10],
        color:'#fff'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideTop',
        offset:[55,-10],
        color:'#fff'
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: '搜索引擎',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideTop',
        offset:[55,-10],
        color:'#fff'
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
};

// 使用 onMounted 钩子函数初始化图表
onMounted(() => {
  if (chartRef.value) {
    const chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(option);
  }
});
</script>

<style scoped>
/* 你的样式可以放在这里 */
</style>
