<script setup lang="ts">
import { reactive, ref ,onMounted} from 'vue'

import VtuberCard from './components/VtuberCard/index.vue'

import { getChannelDetail } from '@/api/vtuber'
import { getVtuberUidList } from '@/config/common.js'

const vtuberUidList = getVtuberUidList()
const loading = ref(true)

const vtuberList: object[] = reactive([])
const getVtuberDetail = async () => {
  for (const item of vtuberUidList) {
    await getChannelDetail({ uId: item, includeExtra: true }).then(res => {
      vtuberList[vtuberUidList.findIndex(uid => uid === item)] = res
      loading.value = false
    })
  }
}
onMounted(()=>{
  getVtuberDetail()
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NbHome'
})
</script>

<template>
  <div class="home-wrap">
    <el-skeleton
      style="width: 80%"
      :loading="loading"
      animated
    >
      <template #template>
        <div style="padding: 16px">
          <div>
            <el-skeleton-item
              variant="circle"
              style="width: 80px; height: 80px; border-radius: 40px"
            />
            <el-skeleton-item
              variant="h3"
              style="width: 80%"
            />
          </div>
          <div
            :style="{
              display: 'flex',
              'align-items': 'center',
              'justify-items': 'space-between',
              'margin-top': '16px',
              height: '16px'
            }"
          >
            <el-skeleton-item
              variant="p"
              style="margin-right: 16px"
            />
            <el-skeleton-item
              variant="p"
              style="width: 30%"
            />
          </div>
          <div
            :style="{
              display: 'flex',
              'align-items': 'center',
              'justify-items': 'space-between',
              'margin-top': '16px',
              height: '16px'
            }"
          >
            <el-skeleton-item
              variant="p"
              style="margin-right: 16px"
            />
            <el-skeleton-item
              variant="p"
              style="width: 70%"
            />
          </div>
        </div>
      </template>
      <template #default>
        <vtuber-card :vtuber-list="vtuberList" />
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped lang="scss">
.home-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
</style>
