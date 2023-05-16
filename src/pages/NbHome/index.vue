<script setup>
import { onMounted, ref, computed } from 'vue'
import { vtuberList, initVtuberList } from '@/hooks/useVtuber'
import { uIdList } from '@/config/constants'
import NbVtuberSimpleCard from '@/components/NbVtuberSimpleCard/index.vue'
import NbSkeleton from '@/components/NbSkeleton/index.vue'

onMounted(() => {
  initVtuberList()
})

const sortMethod = ref('')

const sortField = [
  { label: '默认', value: '' },
  { label: '总时长', value: 'totalLiveSecond' },
  { label: '总场次', value: 'totalLiveCount' },
  {
    label: '总流水',
    value: 'totalIncome'
  },
  { label: '平均流水', value: 'averageIncome' }
]

const sortedList = computed(() => {
  switch (sortMethod.value) {
    case 'totalLiveSecond':
      return vtuberList.value.sort((a, b) => {
        return b.channel.totalLiveSecond - a.channel.totalLiveSecond
      })
    case 'totalLiveCount':
      return vtuberList.value.sort((a, b) => {
        return b.channel.totalLiveCount - a.channel.totalLiveCount
      })
    case 'totalIncome':
      return vtuberList.value.sort((a, b) => {
        return b.channel.totalIncome - a.channel.totalIncome
      })
    case 'averageIncome':
      return vtuberList.value.sort((a, b) => {
        return (
          b.channel.totalIncome / (b.channel.totalLiveSecond / (60 * 60)) -
          a.channel.totalIncome / (a.channel.totalLiveSecond / (60 * 60))
        )
      })
    default:
      return vtuberList.value
  }
})
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NbHome'
})
</script>

<template>
  <div class="home-wrap">
    <div class="vtuber-card-sort">
      <div class="vtuber-card-sort-label">排序方式：</div>
      <el-radio-group v-model="sortMethod">
        <template
          v-for="item in sortField"
          :key="item.value"
        >
          <el-radio-button :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </template>
      </el-radio-group>
    </div>
    <template
      v-for="(item, index) in vtuberList"
      :key="index"
    >
      <NbVtuberSimpleCard :vtuber-simple-data="item" />
    </template>
    <NbSkeleton :if-condition="vtuberList.length < uIdList.length" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

.home-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.vtuber-card-sort {
  width: $wrapWidth;
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .vtuber-card-sort-label {
    font-size: 14px;
  }
}
</style>
