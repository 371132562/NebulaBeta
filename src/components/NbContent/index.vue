<script setup>
import { onMounted } from 'vue'
import {getVtuberDetail} from '@/stores/vtuber'
onMounted(() => {
  getVtuberDetail()
})
</script>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NbContent'
})
</script>

<template>
  <div class="nb-content">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';
.nb-content {
  position: absolute;
  top: $header-height;
  width: 100%;
  height: calc(100% - $header-height);
  overflow: auto;
}
</style>
