<script setup lang="ts">
import menus from './menuList'

function dragStart(e: DragEvent) {
  let info: object = {
    // getAttribute: 通过属性名获取属性值，不存在则返回null
    name: (e.target as HTMLElement).getAttribute('data-name'),
    type: (e.target as HTMLElement).getAttribute('data-type'),
  };
  // DataTransfer对象用于保存拖动并放下过程中的数据。从拖动事件的dataTransfer属性上获取
  (e.dataTransfer)!.setData('info', JSON.stringify(info))
}
</script>

<template>
  <div class="wrapper">
    <div class="menuItem" v-for="(item, index) in menus" :key="index" :data-type="item.type" :data-name="item.name"
      draggable="true" @dragstart="dragStart">
      {{ item.name }}
    </div>
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
