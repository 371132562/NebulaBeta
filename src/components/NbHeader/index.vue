<script setup>
import { menu } from '@/config/common'
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NbHeader'
})
</script>
<template>
  <div class="nb-header">
    <router-link
      v-for="(item, index) in menu"
      :key="index"
      class="menu-item"
      :to="item.path"
      active-class="menu-active"
    >
      <el-icon class="menu-icon">
        <component :is="item.icon" />
      </el-icon>
      {{ item.name }}
    </router-link>
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
  background-color: rgba(255, 255, 255, 0.03);

  .menu-item {
    padding: 0 12px;
    line-height: $header-height;
    cursor: pointer;
    color: $text-color;
    text-decoration: none;
    transition: color 0.3s cubic-bezier(0.33, 1, 0.68, 1),
      border-color 0.3s cubic-bezier(0.33, 1, 0.68, 1);

    &:hover {
      color: $text-color-active;
      border-bottom: 1px solid $text-color-active;
    }
  }

  .menu-active {
    color: $text-color-active;
    border-bottom: 1px solid $text-color-active;
  }

  .menu-icon {
    font-size: 20px;
    vertical-align: text-bottom;
  }
}
</style>
