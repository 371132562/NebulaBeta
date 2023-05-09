<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { vtuberDetailList } from '@/stores/vtuber'

const router = useRouter()

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
    return vtuberDetailList.value.sort((a, b) => {
      return b.channel.totalLiveSecond - a.channel.totalLiveSecond
    })
  case 'totalLiveCount':
    return vtuberDetailList.value.sort((a, b) => {
      return b.channel.totalLiveCount - a.channel.totalLiveCount
    })
  case 'totalIncome':
    return vtuberDetailList.value.sort((a, b) => {
      return b.channel.totalIncome - a.channel.totalIncome
    })
  case 'averageIncome':
    return vtuberDetailList.value.sort((a, b) => {
      return (
        b.channel.totalIncome / (b.channel.totalLiveSecond / (60 * 60)) -
          a.channel.totalIncome / (a.channel.totalLiveSecond / (60 * 60))
      )
    })
  default:
    return vtuberDetailList.value
  }
})

const jumpToDetail = uId => {
  router.push({ path: '/detail', query: { uid: uId } })
}

const jumpToChannel = () => {
  console.log(2)
}
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VtuberCard',
  props: {}
})
</script>

<template>
  <div class="vtuber-card-sort">
    <div class="vtuber-card-sort-label">
      排序方式：
    </div>
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
  <div class="vtuber-card-wrap">
    <div
      v-for="(item, index) in sortedList"
      :key="index"
      class="vtuber-card"
    >
      <div
        class="vtuber-info"
        @click.prevent="jumpToDetail(item.channel.uId)"
      >
        <div>
          <div class="vtuber-avatar">
            <el-avatar
              shape="circle"
              :size="60"
              :src="item.channel.faceUrl"
            />
            <div
              v-if="item.channel.isLiving"
              class="vtuber-info-stream"
              @click.stop="jumpToChannel"
            >
              <img
                src="@/assets/images/live.gif"
                alt=""
              >
              直播中
            </div>
          </div>
        </div>
        <div class="vtuber-info-text">
          {{ item.channel.uName }}
        </div>
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="总时长（时）"
          :value="item.channel.totalLiveSecond / (60 * 60)"
          :precision="2"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="总直播场次"
          :value="item.channel.totalLiveCount"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="总流水（元）"
          :value="item.channel.totalIncome"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="平均流水（元/时）"
          :value="
            item.channel.totalIncome /
              (item.channel.totalLiveSecond / (60 * 60))
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

$minWidth: 200px;

.vtuber-card-sort {
  width: $wrapWidth;
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .vtuber-card-sort-label {
    font-size: 14px;
  }
}

.vtuber-card-wrap {
  width: $wrapWidth;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  .vtuber-card {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 12px;
    margin-bottom: 32px;
    width: 100%;
    border-radius: 4px;
    background-color: $card-background-color;

    .vtuber-card-divider {
      box-sizing: border-box;
      width: 1px;
      height: 70%;
      background-color: $divider-color;
    }
  }
}

.vtuber-info {
  box-sizing: border-box;
  padding-right: 8px;
  min-width: $minWidth;
  text-align: center;
  cursor: pointer;

  .vtuber-avatar {
    position: relative;
    margin-bottom: 8px;
  }

  .vtuber-info-stream {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%, 0);
    box-sizing: border-box;
    display: inline-block;
    font-size: 12px;
    padding: 4px;
    margin-bottom: 4px;
    color: #fff;
    //border: 1px solid rgba(255,255,255,0.7);
    border-radius: 6px;
    background-color: #f69;
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.7);

    img {
      width: 10px;
    }
  }

  .vtuber-info-text {
    color: $text-color;
    font-size: 18px;
  }
}

.vtuber-data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  min-width: $minWidth;
}
</style>
