<script setup>
defineProps({
  ifCondition: {
    type: Boolean,
    default: false
  }
})
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NbSkeleton'
})
</script>

<template>
  <template v-if="ifCondition">
    <el-skeleton
      style="width: 80%"
      animated
    >
      <template #template>
        <div style="padding: 16px">
          <div>
            <el-skeleton-item
              variant="circle"
              style="width: 80px; height: 80px; border-radius: 40px"
            />
            <el-skeleton-item
              variant="h3"
              style="width: 80%"
            />
          </div>
          <div
            :style="{
              display: 'flex',
              'align-items': 'center',
              'justify-items': 'space-between',
              'margin-top': '16px',
              height: '16px'
            }"
          >
            <el-skeleton-item
              variant="p"
              style="margin-right: 16px"
            />
            <el-skeleton-item
              variant="p"
              style="width: 30%"
            />
          </div>
          <div
            :style="{
              display: 'flex',
              'align-items': 'center',
              'justify-items': 'space-between',
              'margin-top': '16px',
              height: '16px'
            }"
          >
            <el-skeleton-item
              variant="p"
              style="margin-right: 16px"
            />
            <el-skeleton-item
              variant="p"
              style="width: 70%"
            />
          </div>
        </div>
      </template>
    </el-skeleton>
  </template>
</template>

<style scoped lang="scss"></style>
