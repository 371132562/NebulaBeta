<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

const router = useRouter()

const props = defineProps({
  vtuberSimpleData: {
    type: Object,
    default: () => {}
  },
  isDetail: {
    type: Boolean,
    default: false
  }
})

const simpleData = computed(() => {
  const { lives } = props.vtuberSimpleData
  const totalLiveCount = lives.length
  const totalLiveTime =
    lives.reduce(
      (total, item) =>
        total +
        (item.isFinish ? item.stopDate : dayjs().valueOf()) -
        item.startDate,
      0
    ) /
    (1000 * 60 * 60)
  const totalIncome = lives.reduce((total, item) => total + item.totalIncome, 0)
  //平均流水
  const averageIncome = totalIncome / totalLiveTime || 0
  return {
    ...props.vtuberSimpleData,
    totalLiveCount,
    totalLiveTime,
    totalIncome,
    averageIncome
  }
})

const jumpToDetail = uId => {
  router.push({ path: '/detail', query: { uId } })
}

const jumpToChannel = () => {
  console.log(2)
}
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NbVtuberSimpleCard'
})
</script>

<template>
  <div class="vtuber-card-wrap">
    <div
      class="vtuber-card"
      @click.prevent="jumpToDetail(simpleData.uId)"
    >
      <div class="vtuber-info">
        <div>
          <div class="vtuber-avatar">
            <el-avatar
              shape="circle"
              :size="60"
              :src="simpleData.faceUrl"
            />
            <div
              v-if="simpleData.isLiving"
              class="vtuber-info-stream"
              @click.stop="jumpToChannel"
            >
              <img
                src="@/assets/images/live.gif"
                alt=""
              />
              直播中
            </div>
          </div>
        </div>
        <div class="vtuber-info-text">
          {{ simpleData.uName }}
        </div>
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          :title="`${isDetail ? '' : '总'}时长（时）`"
          :value="simpleData.totalLiveTime"
          :precision="2"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          :title="`${isDetail ? '' : '总'}直播场次`"
          :value="simpleData.totalLiveCount"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          :title="`${isDetail ? '' : '总'}流水（元）`"
          :value="simpleData.totalIncome"
          :precision="1"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="平均流水（元/时）"
          :value="simpleData.averageIncome"
          :precision="2"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="粉丝"
          :value="simpleData.fansCount[0]"
        />
        <div class="vtuber-data-footer">
          对比昨日
          <span
            :class="
              simpleData.fansCount[0] <= simpleData.fansCount[1]
                ? 'red'
                : 'green'
            "
          >
            {{ simpleData.fansCount[1] - simpleData.fansCount[0] }}
            <el-icon>
              <CaretTop
                v-if="simpleData.fansCount[0] <= simpleData.fansCount[1]"
              />
              <CaretBottom v-else />
            </el-icon>
          </span>
        </div>
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="舰长"
          :value="simpleData.guardCount[0]"
        />
        <div class="vtuber-data-footer">
          对比昨日
          <span
            :class="
              simpleData.guardCount[0] <= simpleData.guardCount[1]
                ? 'red'
                : 'green'
            "
          >
            {{ simpleData.guardCount[1] - simpleData.guardCount[0] }}
            <el-icon>
              <CaretTop
                v-if="simpleData.guardCount[0] <= simpleData.guardCount[1]"
              />
              <CaretBottom v-else />
            </el-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

$minWidth: 140px;
.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
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
    cursor: pointer;
    transition: box-shadow 0.15s cubic-bezier(0.33, 1, 0.68, 1);

    //&:hover {
    //  box-shadow: 1px 1px 4px 2px rgb(6, 218, 255);
    //}

    .vtuber-card-divider {
      box-sizing: border-box;
      width: 1px;
      height: 70%;
      background-color: $divider-color;
    }

    .vtuber-info {
      box-sizing: border-box;
      padding-right: 8px;
      min-width: $minWidth;
      text-align: center;

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
        font-size: 16px;
      }
    }

    .vtuber-data {
      height: 60%;
      padding-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      //align-items: center;
      box-sizing: border-box;
      min-width: $minWidth;
    }

    .vtuber-data-footer {
      margin-top: 4px;
      font-size: 12px;
      color: $text-color;
    }
  }
}
</style>
