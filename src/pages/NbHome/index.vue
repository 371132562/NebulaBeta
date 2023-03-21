<script setup lang="ts">
import { reactive } from 'vue'
import VtuberCard from './components/VtuberCard/index.vue'
import { getChannelDetail } from '@/api/vtuber'
import { vtuberUidList } from '@/config/common.js'

const vtuberList: object[] = reactive([])
getChannelDetail({ uId: vtuberUidList[0], includeExtra: true }).then(res => {
  console.log(res)
  vtuberList.push(res)
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NbHome'
})
</script>

<template>
  <vtuber-card :vtuber-list="vtuberList" />
</template>

<style scoped lang="scss"></style>
