<script setup lang="ts">
import { vtuberDetailList } from '@/stores/vtuber'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VtuberCard',
  props: {}
})
</script>

<template>
  <div class="vtuber-card-wrap">
    <div
      v-for="(item, index) in vtuberDetailList"
      :key="index"
      class="vtuber-card"
    >
      <div class="vtuber-info">
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
          precision="2"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="总直播场次"
          :value="item.channel.totalLiveCount"
          precision="2"
        />
      </div>
      <div class="vtuber-card-divider" />
      <div class="vtuber-data">
        <el-statistic
          title="总流水（元）"
          :value="item.channel.totalIncome"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

$minWidth: 200px;
.vtuber-card-wrap {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  .vtuber-card {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;
    margin-bottom: 32px;
    width: 100%;
    border-radius: 4px;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.6);
    background-color: #00adb5;

    .vtuber-card-divider {
      box-sizing: border-box;
      width: 1px;
      height: 70%;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
}

.vtuber-info {
  box-sizing: border-box;
  padding-right: 8px;
  min-width: $minWidth;
  text-align: center;

  .vtuber-avatar {
    position: relative;
    margin-bottom: 4px;
  }

  .vtuber-info-stream {
    position: absolute;
    bottom: 0;
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
    background-color: #ea5455;
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.7);
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
