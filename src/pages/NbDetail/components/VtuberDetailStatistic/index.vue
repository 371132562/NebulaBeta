<script setup>
import { computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import * as echarts from 'echarts'

import NbVtuberSimpleCard from '@/components/NbVtuberSimpleCard/index.vue'

const props = defineProps({
  currentVtuber: {
    type: Object,
    default: () => ({})
  }
})

const statisticData = computed(() => {
  const { lives } = props.currentVtuber
  const dailyLiveTime = dailyLiveTimeCalc(lives)
  return {
    dailyLiveTime
  }
})

//根据lives数组中每项的startDate和stopDate计算每个自然日内的直播时间持续多少分钟
const dailyLiveTimeCalc = lives => {
  lives.reverse()
  const dayLiveTime = {}
  lives.forEach(item => {
    const startDate = dayjs(item.startDate).format('YYYY-MM-DD')
    const stopDate = dayjs(item.stopDate).format('YYYY-MM-DD')
    if (startDate === stopDate) {
      if (!dayLiveTime[startDate]) {
        dayLiveTime[startDate] = 0
      }
      dayLiveTime[startDate] += (item.stopDate - item.startDate) / (1000 * 60)
    } else {
      const startDay = dayjs(item.startDate)
      const stopDay = dayjs(item.stopDate)
      let day = startDay
      while (day <= stopDay) {
        if (!dayLiveTime[day.format('YYYY-MM-DD')]) {
          dayLiveTime[day.format('YYYY-MM-DD')] = 0
        }
        if (day.format('YYYY-MM-DD') === startDay.format('YYYY-MM-DD')) {
          dayLiveTime[day.format('YYYY-MM-DD')] +=
            (day.endOf('day') - item.startDate) / (1000 * 60)
        } else if (day.format('YYYY-MM-DD') === stopDay.format('YYYY-MM-DD')) {
          dayLiveTime[day.format('YYYY-MM-DD')] +=
            (item.stopDate - day.startOf('day')) / (1000 * 60)
        } else {
          dayLiveTime[day.format('YYYY-MM-DD')] +=
            (day.endOf('day') - day.startOf('day')) / (1000 * 60)
        }
        day = day.add(1, 'day')
      }
    }
  })
  let result = []
  for (const dayLiveTimeKey in dayLiveTime) {
    result.push([dayLiveTimeKey, +dayLiveTime[dayLiveTimeKey].toFixed(2)])
  }
  return result
}

onMounted(() => {
  let chartDom = document.getElementById('daily-live-time-chart')
  let myChart = echarts.init(chartDom, 'dark')
  let option = {
    title: {
      top: 30,
      left: 'center',
      text: 'Daily Step Count'
    },
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
      data: statisticData.value.dailyLiveTime
    }
  }
  myChart.setOption(option)
})
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VtuberDetailStatistic'
})
</script>

<template>
  <div class="statistic-wrap">
    <NbVtuberSimpleCard
      :vtuber-simple-data="currentVtuber"
      :is-detail="true"
    />
    <div
      id="daily-live-time-chart"
      class="statistic-chart"
    ></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}

.statistic-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .statistic-chart {
    width: $wrapWidth;
    height: 400px;
  }
}
</style>
