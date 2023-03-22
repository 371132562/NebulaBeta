<script setup lang="ts">
import { reactive, ref } from 'vue'

import dayjs from 'dayjs'

import { Search } from '@element-plus/icons-vue'

const selectedDate = ref([
  dayjs().valueOf() - 3600 * 24 * 7 * 1000,
  dayjs().valueOf()
])
const shortcuts = [
  {
    text: '最近7天',
    value: () => {
      const end = dayjs().valueOf()
      return [end - 3600 * 24 * 7 * 1000, end]
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
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NbSearch'
})
</script>

<template>
  <el-date-picker
    v-model="selectedDate"
    :shortcuts="shortcuts"
    type="daterange"
    unlink-panels
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="x"
  />
  <el-button
    :style="{ 'vertical-align': 'baseline', 'margin-left': '8px' }"
    :icon="Search"
    @click="searchByDate"
  >
    按日期查询
  </el-button>
</template>

<style scoped lang="scss"></style>
