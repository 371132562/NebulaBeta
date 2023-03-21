<script setup lang="ts"></script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VtuberCard',
  props: {
    vtuberList: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  }
})
</script>

<template>
  <div
    v-for="(item, index) in vtuberList"
    :key="index"
  >
    <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
  </div>
</template>

<style scoped lang="scss"></style>
