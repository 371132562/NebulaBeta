<script setup lang="ts"></script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VtuberCard',
  props: {
    vtuberList: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  }
})
</script>

<template>
  <div class="vtuber-card-wrap">
    <div
      v-for="(item, index) in vtuberList"
      :key="index"
      class="vtuber-card"
    >
      <div class="vtuber-info">
        <div>
          <div class="vtuber-avatar">
            <el-avatar
              shape="circle"
              :size="80"
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
        <div class="vtuber-data-title">
          1
        </div>
        <div class="vtuber-data-content">
          2
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

.vtuber-card-wrap {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  .vtuber-card {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
    border-radius: 4px;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.6);
    background-color: #00adb5;

    .vtuber-card-divider {
      box-sizing: border-box;
      width: 1px;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
}

.vtuber-info {
  box-sizing: border-box;
  padding-right: 8px;
  min-width: 200px;
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

.vtuber-data{
  .vtuber-data-title{

  }
  .vtuber-data-content{

  }
}
</style>
