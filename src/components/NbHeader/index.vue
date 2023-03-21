<script setup lang="ts">
import { menu } from '@/config/common'
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NbHeader'
})
</script>
<template>
  <div class="nb-header">
    <span
      v-for="(item, index) in menu"
      :key="index"
      class="menu-item"
    >
      <el-icon class="menu-icon">
        <component :is="item.icon" />
      </el-icon>
      {{ item.name }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';

.nb-header {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: $header-height;
  font-size: 14px;
  box-shadow: 0 0 10px 0 rgb(0, 0, 0);

  .menu-item {
    padding: 0 12px;
    line-height: $header-height;
    cursor: pointer;
    color: $text-color;

    &:hover {
      color: $text-color-active;
    }
  }

  .menu-icon {
    font-size: 20px;
    vertical-align: text-bottom;
  }
}
</style>
