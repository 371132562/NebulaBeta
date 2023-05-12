<script setup>
import VtuberCard from './components/VtuberCard/index.vue'
import { vtuberDetailList } from '@/stores/vtuber'
import NbSkeleton from '@/components/NbSkeleton/index.vue'
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
    <NbSkeleton :if-condition="vtuberDetailList.length < 8" />
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
