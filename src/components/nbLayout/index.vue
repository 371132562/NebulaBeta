<script setup lang="ts">
import NbHeader from '@/components/nbHeader/index.vue'
import NbContent from '@/components/nbContent/index.vue'
</script>

<script lang="ts">
export default {
  name: 'NbLayout'
}
</script>

<template>
  <div class="nb-layout" />
  <NbHeader />
  <NbContent />
</template>

<style scoped lang="scss">
.nb-layout {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
