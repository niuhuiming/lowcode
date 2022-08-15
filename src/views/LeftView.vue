<script setup lang="ts">
import menus from './menuList'
</script>

<template>
  <div class="wrapper">
    <div class="menuItem" v-for="(item, index) in menus" :key="index">{{ item.name }}</div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 243px;
  padding: 8px;

  .menuItem {
    background: #eee;
    width: 100px;
    height: 100px;
    float: left;
    margin: 10px;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
  }
}
</style>
