<script setup lang="ts">
import NbHeader from '@/components/NbHeader/index.vue'
import NbContent from '@/components/NbContent/index.vue'
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NbLayout'
})
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
