<script setup>
import { useRouter } from 'vue-router'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'

const router = useRouter()

defineProps({
  vtuberList: {
    type: Array,
    default: () => []
  },
  isDetail: {
    type: Boolean,
    default: false
  }
})

const cardData = vtuber => {
  const { lives } = vtuber
  const totalLiveCount = lives.length
  const totalLiveTime =
    lives.reduce((total, item) => total + (item.stopDate - item.startDate), 0) /
    (1000 * 60 * 60)
  const totalIncome = lives.reduce((total, item) => total + item.totalIncome, 0)
  //平均流水
  const averageIncome = totalIncome / totalLiveTime || 0
  return {
    ...vtuber,
    totalLiveCount,
    totalLiveTime,
    totalIncome,
    averageIncome
  }
}

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
      v-for="(item, index) in vtuberList"
      :key="index"
      class="vtuber-card"
      @click.prevent="jumpToDetail(cardData(item).uId)"
    >
      <div class="vtuber-info">
        <div>
          <div class="vtuber-avatar">
            <el-avatar
              shape="circle"
              :size="60"
              :src="cardData(item).faceUrl"
            />
            <div
              v-if="cardData(item).isLiving"
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
          {{ cardData(item).uName }}
        </div>
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          :title="`${isDetail ? '' : '总'}时长（时）`"
          :value="cardData(item).totalLiveTime"
          :precision="2"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          :title="`${isDetail ? '' : '总'}直播场次`"
          :value="cardData(item).totalLiveCount"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          :title="`${isDetail ? '' : '总'}流水（元）`"
          :value="cardData(item).totalIncome"
          :precision="1"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="平均流水（元/时）"
          :value="cardData(item).averageIncome"
          :precision="2"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="粉丝"
          :value="cardData(item).fansCount[0]"
        />
        <div class="vtuber-data-footer">
          对比昨日
          <span
            :class="
              cardData(item).fansCount[0] <= cardData(item).fansCount[1]
                ? 'red'
                : 'green'
            "
          >
            {{ cardData(item).fansCount[1] - cardData(item).fansCount[0] }}
            <el-icon>
              <CaretTop
                v-if="
                  cardData(item).fansCount[0] <= cardData(item).fansCount[1]
                "
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
          :value="cardData(item).guardCount[0]"
        />
        <div class="vtuber-data-footer">
          对比昨日
          <span
            :class="
              cardData(item).guardCount[0] <= cardData(item).guardCount[1]
                ? 'red'
                : 'green'
            "
          >
            {{ cardData(item).guardCount[1] - cardData(item).guardCount[0] }}
            <el-icon>
              <CaretTop
                v-if="
                  cardData(item).guardCount[0] <= cardData(item).guardCount[1]
                "
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
