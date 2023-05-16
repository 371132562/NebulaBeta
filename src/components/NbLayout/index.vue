<script setup>
import NbHeader from '@/components/NbLayout/components/NbHeader/index.vue'
import NbContent from '@/components/NbLayout/components/NbContent/index.vue'
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NbLayout'
})
</script>

<template>
  <div class="nb-layout">
    <NbHeader />
    <NbContent />
  </div>
</template>

<style scoped lang="scss">
.nb-layout {
  position: relative;
}
</style>
