<script setup>
import { onMounted } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import NbLayout from '@/components/NbLayout/index.vue'

import { getVtuberSimpleList } from '@/hooks/useVtuber'

onMounted(() => {
  getVtuberSimpleList()
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <NbLayout />
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
