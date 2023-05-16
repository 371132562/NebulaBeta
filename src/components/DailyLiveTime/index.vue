<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  dailyLiveTimeData: {
    type: Object,
    default: () => ({})
  }
})

onMounted(() => {
  let chartDom = document.getElementById('daily-live-time-chart')
  let myChart = echarts.init(chartDom, 'dark')
  let option = {
    tooltip: {},
    visualMap: {
      min: 0,
      max: 300,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: '2023',
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { show: false }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: props.dailyLiveTimeData
    }
  }
  myChart.setOption(option)
})
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DailyLiveTime'
})
</script>

<template>
  <div
    id="daily-live-time-chart"
    class="statistic-chart"
  ></div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

.statistic-chart {
  width: $wrapWidth;
  height: 260px;
}
</style>
