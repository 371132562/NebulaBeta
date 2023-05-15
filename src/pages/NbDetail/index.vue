<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

import { dateShortcuts } from '@/config/constants'
import {
  allVtuberList,
  vtuberList,
  getVtuberDetailById
} from '@/hooks/useVtuber'
import VtuberDetailStatistic from '@/pages/NbDetail/components/VtuberDetailStatistic/index.vue'
import NbSkeleton from '@/components/NbSkeleton/index.vue'

const router = useRouter()

//当前路由uId
const uId = computed(() => {
  return +router.currentRoute.value.query.uId || null
})

const currentVtuber = computed(() => {
  if (uId.value) {
    if (selectedDate.value && selectedDate.value[0] && selectedDate.value[1]) {
      const vtuber = vtuberList.value.find(item => item.uId === uId.value)
      const { fansHistory = [], guardHistory = [], lives = [] } = vtuber
      return {
        isFilter: true,
        ...vtuber,
        fansHistory: fansHistory.filter(item => {
          return (
            dayjs(item.time).valueOf() >=
              dayjs(selectedDate.value[0]).valueOf() &&
            dayjs(item.time).valueOf() <= dayjs(selectedDate.value[1]).valueOf()
          )
        }),
        guardHistory: guardHistory.filter(item => {
          return (
            dayjs(item.time).valueOf() >=
              dayjs(selectedDate.value[0]).valueOf() &&
            dayjs(item.time).valueOf() <= dayjs(selectedDate.value[1]).valueOf()
          )
        }),
        lives: lives.filter(item => {
          return (
            dayjs(item.startDate).valueOf() >=
              dayjs(selectedDate.value[0]).valueOf() &&
            dayjs(item.startDate).valueOf() <=
              dayjs(selectedDate.value[1]).valueOf()
          )
        })
      }
    } else {
      return vtuberList.value.find(item => item.uId === uId.value)
    }
  } else {
    return undefined
  }
})

//当前选择的主播的uId
const currentVtuberUId = ref(uId.value || null)

//时间选择器数据
const selectedDate = ref(['', ''])

watch(
  uId,
  () => {
    if (uId.value) {
      getVtuberDetailById(uId.value)
    }
  },
  { immediate: true }
)

//禁用今天之后的日期,合并主播有记录的第一次直播时间为最早时间
const disabledDate = date => {
  if (currentVtuber.value && currentVtuber?.value?.lives.length) {
    const { lives = [] } = currentVtuber.value
    return (
      dayjs().endOf('d').valueOf() < dayjs(date).valueOf() ||
      dayjs(date).valueOf() < dayjs(lives[lives.length - 1].startDate).valueOf()
    )
  } else {
    return dayjs().endOf('d').valueOf() < dayjs(date).valueOf()
  }
}
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NbSearch'
})
</script>

<template>
  <div class="detail-wrap">
    <div class="detail-filter">
      <el-select-v2
        v-model="currentVtuberUId"
        :options="allVtuberList"
        filterable
        placeholder="选择主播"
        class="all-vtuber-select"
        :height="400"
        @change="() => router.push(`/detail?uId=${currentVtuberUId}`)"
      />
      <el-date-picker
        v-if="currentVtuber"
        v-model="selectedDate"
        :shortcuts="dateShortcuts"
        type="daterange"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="x"
        :disabled-date="disabledDate"
      />
    </div>
    <VtuberDetailStatistic
      v-if="currentVtuber"
      :current-vtuber="currentVtuber"
    />
    <el-result
      v-if="!uId"
      icon="warning"
      title="没有可用的uId，请选择主播或返回主页"
    >
      <template #extra>
        <el-button
          type="primary"
          @click="() => router.push('/')"
          >返回
        </el-button>
      </template>
    </el-result>
    <NbSkeleton :if-condition="!currentVtuber && uId" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

.detail-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  width: 100%;

  .detail-filter {
    width: $wrapWidth;
    margin-bottom: 16px;
  }
}

.all-vtuber-select {
  width: 220px;
  vertical-align: bottom;
  margin-right: 8px;
}
</style>
