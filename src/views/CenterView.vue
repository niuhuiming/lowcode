<script setup lang="ts">
// 拖拽到画布的回调
function dragOver(e: Event) {
  e.preventDefault()
}
// 鼠标松开的回调
function drop(e: any) {
  e.preventDefault()
  let info = JSON.parse(e.dataTransfer.getData('info'));
  console.log(info);
}
</script>

<template>
  <div class="wrapper" @dragover="dragOver" @drop="drop">
    中间
  </div>
</template>

<style scoped lang="less">
.wrapper {
  flex: 1;
  background-color: gray;
}
</style>
