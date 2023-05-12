<script setup>
import { onMounted } from 'vue'
import { vtuberList, initVtuberList } from '@/hooks/useVtuber'
import { uIdList } from '@/config/constants'
import VtuberCard from './components/VtuberCard/index.vue'
import NbSkeleton from '@/components/NbSkeleton/index.vue'

onMounted(() => {
  initVtuberList()
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
    <VtuberCard />
    <NbSkeleton :if-condition="vtuberList.length < uIdList.length" />
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
