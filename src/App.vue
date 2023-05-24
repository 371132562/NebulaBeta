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
    <a
      id="auth"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      >豫ICP备2021036070号-1</a
    >
  </el-config-provider>
</template>

<style scoped lang="scss">
#auth {
  display: inline-block;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  font-size: 14px;
  text-decoration: none;
  color: #eee;
}
</style>
