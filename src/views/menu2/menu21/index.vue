<template>
  <div class="investment-screen">
    <svg style="position: absolute; left: 20px; top: 20px; cursor: pointer" @click="backMap" t="1681180771137"
      class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3427" width="200"
      height="200">
      <path
        d="M426.666667 384V213.333333l-298.666667 298.666667 298.666667 298.666667v-174.933334c213.333333 0 362.666667 68.266667 469.333333 217.6-42.666667-213.333333-170.666667-426.666667-469.333333-469.333333z"
        p-id="3428" fill="#ffffff"></path>
    </svg>
    <div class="map-chart" id="mapEchart"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from "echarts";
import "echarts-gl";
import axios from "axios";

/**
 * 初始化地图
 */

//定义echarts方法
const chartMap = async () => {
  //初始化dom
  const myChart = echarts.init(
    <HTMLElement>document.getElementById("mapEchart")
  );
  //初始化map
  initMap(myChart, "map", "100000");
  //添加点击事件
  myChart.on("click", (e: any) => {
    console.log(e);
    const newName = e.name;
    if (e.value.level === 'district') return alert("该地区已经无法下钻");
    //添加历史记录
    historyMapData.value.push(e.value);
    //初始化地图
    initMap(myChart, newName, e.value.adcode);
  });
  //让可视化地图跟随浏览器大小缩放
  window.addEventListener("resize", () => {
    myChart.resize();
  })
}
//初始化图表
const initMap = async (
  chartDOM: echarts.ECharts,
  geoName: string,
  adcode: string
) => {
  //清除echarts实例
  chartDOM.clear();
  //请求map的json
  const mapData = await getMapJSON(adcode, geoName);
  //图表配置项
  const option = getOption(geoName, mapData);
  //渲染配置
  chartDOM.setOption(option);
}

/**
 * 地图配置项
 */

//请求地图json数据，并过滤成地图data配置项
const getMapJSON = async (adcode: string = '100000', geoName: string) => {
  const res = await axios.get(
    `https://geo.datav.aliyun.com/areas_v2/bound/${adcode}_full.json`
  );

  //重新注册地图
  echarts.registerMap(geoName, <any>res.data);
  //过滤json数据

  const mapData = res.data.features.map((item: any) => {
    return {
      value: item.properties,
      name: item.properties.name,
    };
  });

  return mapData;
}
var alirl = [[[121.15, 31.89], [121.48, 31.22]],
[[120.38, 37.35], [121.48, 31.22]],
[[123.97, 47.33], [121.48, 31.22]],
[[118.87, 42.28], [121.48, 31.22]],
[[121.52, 36.89], [121.48, 31.22]],
[[102.188043, 38.520089], [121.48, 31.22]],
[[118.58, 24.93], [121.48, 31.22]],
[[120.53, 36.86], [121.48, 31.22]],
[[119.46, 35.42], [121.48, 31.22]],
[[119.97, 35.88], [121.48, 31.22]],
[[121.05, 32.08], [121.48, 31.22]],
[[91.11, 29.97], [121.48, 31.22]]
]
//图表生成配置项
const getOption = (geoName: string, mapData: any) => {
  //图表配置项
  const option = {
    geo3D: {
      zlevel: 500,
      show: true,
      map: geoName,//地图类型。echarts-gl 中使用的地图类型同geo组件相同
      regionHeight: 1,
      shading: "realistic",
      realisticMaterial: {
        // detailTexture: "./1.png",
      },
      viewControl: {
        alpha: 60,
        beta: 5,
        targetCoord: [116.3975, 39.9085]
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: "#5FB9DA",
        color: "#6597D0",
        opacity: 1,
      },
      label: {
        show: true,//是否显示标签
        textStyle: {
          color: "#fff", // 地图初始化区域字体颜色
          fontSize: 40,
        },
        formatter: (e: any) => {
          return `    ${e.name} `;
        },
      },
    },
    series: [
      {
        zlevel: -10,
        regionHeight: 2,
        type: "map3D",
        map: geoName,//地图类型。echarts-gl中使用的地图类型同geo组件相同
        data: mapData,//这里比较重要：获得过滤后的data，这样点击事件是就能获得这个data的值
        emphasis: {
          label: { show: false },
          itemStyle: {
            color: "transparent",
          },
        },
        shading: "realistic",
        realisticMaterial: {
          // detailTexture: './4.png',
          textureTiling: 2,
        },
        itemStyle: {
          color: "transparent"
        },
      },
      {
        type: 'lines3D',
        coordinateSystem: 'geo3D',
        effect: {
          show: true,
          period: 3,
          trailWidth: 3,
          trailLength: 0.5,
          trailOpacity: 1,
          trailColor: '#0087f4',
          constantSpeed: 50
        },
        lineStyle: {
          width: 2,
          color: '#0087f4', // 飞线颜色
          opacity: 0,
        },
        blendMode: 'lighter',
        data: [
          {
            coords: [
              [116.407394, 39.904211], // 起点坐标
              [121.473701, 31.230416], // 终点坐标
              // 中间坐标点...
            ],
          },
          {
            coords: [
              [116.407394, 39.904211], // 起点坐标
              [113.280637, 23.125178], // 终点坐标
              // 中间坐标点...
            ],
          },
        ],
      },
    ],
  };
  return option;
}

/**
 * 返回上一级地图功能
 */

type HistoryData = {
  name: string;
  adcode: string | undefined;
};
//地图下钻历史记录
const historyMapData = ref<HistoryData[]>([{ name: "map", adcode: "100000" }]);
// 返回上级地图
const backMap = () => {
  const myChart = echarts.init(
    <HTMLElement>document.getElementById("mapEchart")
  );
  //去除当前的地图信息
  historyMapData.value.pop();
  const len = historyMapData.value.length;
  //获取上一级的地图信息
  const newData = historyMapData.value[len - 1];
  //重新渲染地图
  initMap(myChart, newData?.name || "map", newData?.adcode || "100000");
};

/**
 * 生命周期
 */
onMounted(() => {
  // 挂载echart
  chartMap();
});
</script>

<style scoped>
.investment-screen {
  background-color: rgb(0, 0, 42);
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-chart {
  width: 80%;
  height: 80%;
}
</style>