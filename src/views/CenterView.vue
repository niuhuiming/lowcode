<script setup lang="ts">
import { getId, mountedComponent } from '../utils'
import { reactive, computed } from 'vue'
import getComponent from '../templates'

const components: any = reactive([])
const currComp: any = reactive({ isShow: false })
let zIndex = 0

const borderStyle = computed(() => {
  let compWidth = 0;
  let compHeight = 0;
  if (currComp.isShow) {
    currComp.isShow.attribute.forEach((item: any) => {
      if (item.key === 'width') {
        compWidth = item.value;
      } else if (item.key === 'height') {
        compHeight = item.value
      }
    })

    let styleObj = {
      width: `${compWidth}px`,
      height: `${compHeight}px`,
      left: `${currComp.isShow.position.left}px`,
      top: `${currComp.isShow.position.top}px`,
      zIndex: `${currComp.isShow.position.zIndex}`
    }
    return styleObj;
  } else {
    return {}
  }
})

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
// 通过事件冒泡找到被点击的元素
function checkComp(e: Event) {
  let reg = /a\w{8}-\w{4}/
  let node: any = e.target
  let count: number = 0
  // 还有node并且node的id不是组件的id，就继续寻找
  while (node && !reg.test(node.id)) {
    if (count++ > 20) {
      return
    }
    node = node.parentNode
  }

  // 获得匹配到的组件的id
  if (node && node.id) {
    currComp.isShow = components.find((item: any) => {
      if (item.info.id === node.id) {
        return item
      }
    })
    console.log(currComp.isShow);
    console.log('--', currComp.isShow.attribute[0].key);
  } else {
    currComp.isShow = false
  }
}
</script>

<template>
  <div id="canvasBox" class="wrapper" @dragover="dragOver" @drop="drop" @click="checkComp">
    <div v-for="(item, index) in components" :key="index" :id="item.info.id"></div>
    <div class="borderStyle" v-if="currComp.isShow" :style="borderStyle"></div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  flex: 1;
  background-color: #eee;
  position: relative;

  .borderStyle {
    border: 3px solid greenyellow;
    position: absolute;
  }
}
</style>
