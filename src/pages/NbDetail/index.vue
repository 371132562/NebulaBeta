<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { Search } from '@element-plus/icons-vue'

import { vtuberList, getVtuberDetailById } from '@/hooks/useVtuber'
import VtuberDetailStatistic from '@/pages/NbDetail/components/VtuberDetailStatistic/index.vue'
import NbSkeleton from '@/components/NbSkeleton/index.vue'

const router = useRouter()
const { uId } = router.currentRoute.value.query

onMounted(() => {
  if (!vtuberList.find(item => item.uId === uId)) {
    getVtuberDetailById(uId)
  }
})

const currentVtuber = computed(() => {
  return vtuberList.find(item => item.uId === uId)
})

//时间选择器数据
const selectedDate = ref([
  dayjs().valueOf() - 3600 * 24 * 7 * 1000,
  dayjs().valueOf()
])
//快捷选项
const shortcuts = [
  {
    text: '最近7天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 7 * 1000, end]
    }
  },
  {
    text: '最近15天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 15 * 1000, end]
    }
  },
  {
    text: '最近30天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 30 * 1000, end]
    }
  },
  {
    text: '最近60天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 60 * 1000, end]
    }
  },
  {
    text: '最近90天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 90 * 1000, end]
    }
  }
]

//按日期查询
const searchByDate = () => {
  console.log(selectedDate.value[1])
}

const disabledData = date => {
  //禁用今天之后的日期
  return dayjs('2023-03-31').endOf('d').valueOf() < dayjs(date).valueOf()
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
    <NbSkeleton :if-condition="!currentVtuber" />
    <template v-if="currentVtuber">
      <div class="detail-time-picker">
        <el-date-picker
          v-model="selectedDate"
          :shortcuts="shortcuts"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="x"
          :disabled-date="disabledData"
        />
        <el-button
          :style="{ 'vertical-align': 'baseline', 'margin-left': '8px' }"
          :icon="Search"
          @click="searchByDate"
        >
          按日期查询
        </el-button>
      </div>
      <VtuberDetailStatistic />
    </template>
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

  .detail-time-picker {
    width: $wrapWidth;
    margin-bottom: 16px;
  }
}
</style>
