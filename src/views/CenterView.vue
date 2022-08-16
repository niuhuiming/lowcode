<script setup lang="ts">
import { getId, mountedComponent } from '../utils'
import getComponent from '../templates'
const components: any = []
let zIndex = 0;


// 拖拽到画布的回调
function dragOver(e: Event) {
  e.preventDefault()
}
// 鼠标松开的回调
function drop(e: any) {
  e.preventDefault()
  let info = JSON.parse(e.dataTransfer.getData('info'))
  info.id = getId()
  // 得到组件的属性、数据和模板
  let component = getComponent(info)
  // 找到组件的宽高
  let compWidth = 0
  let compHeight = 0
  component.attribute.forEach((item: any) => {
    if (item.key === 'width') {
      compWidth = item.value
    } else if (item.key === 'height') {
      compHeight = item.value
    }
  })
  // 设置组件的位置，将拖拽的组件放入数组中
  let left = Math.max(e.offsetX - compWidth / 2, 0)
  let top = Math.max(e.offsetY - compHeight / 2, 0)
  zIndex++
  component.position = { left, top, zIndex }
  components.push(component)
  // 设置组件的挂载点
  mountedComponent(component)  
}
</script>

<template>
  <div class="wrapper" @dragover="dragOver" @drop="drop">
    <div v-for="(item, index) in components" :key="index" :id="item.info.id"></div>
    <div id="xxx"></div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  flex: 1;
  background-color: #eee;
  position: relative;
}
</style>
