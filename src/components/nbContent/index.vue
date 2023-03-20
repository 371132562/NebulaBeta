<script setup lang="ts">
const a = 1
</script>

<script lang="ts">
export default {
  name: 'NbContent'
}
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
