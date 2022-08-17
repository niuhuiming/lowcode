<script setup lang="ts">
import { getId, mountedComponent } from '../utils'
import { reactive, computed } from 'vue'
import getComponent from '../templates'
import emitter from '../utils/emitter'

const components: any = reactive([])
const currComp: any = reactive({ isShow: false })
let zIndex: number = 0

let startPosition = { x: 0, y: 0 }

// 计算属性，显示被点击组件的边框
const borderStyle = computed(() => {
  let compWidth: number = 0
  let compHeight: number = 0
  if (currComp.isShow) {
    currComp.isShow.attribute.forEach((item: any) => {
      if (item.key === 'width') {
        compWidth = item.value
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
    return styleObj
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

// 边界限定
function boundaryLimit(type: string, num: number, comp: any) {
  // 画布的宽高
  let canvas: any = document.getElementById('canvasBox')
  let canvasWidth = canvas.clientWidth
  let canvasHeight = canvas.clientHeight
  // 组件的宽高
  let compWidth = 0
  let compHeight = 0;
  comp.attribute.forEach((item: any) => {
    if (item.key === 'width') {
      compWidth = item.value
    }
    if (item.key === 'height') {
      compHeight = item.value
    }
  })
  // 边界值
  let maxX = canvasWidth - compWidth
  let maxY = canvasHeight - compHeight

  let lastNum = 0
  if (type === 'x') {
    if (num < 0) {
      lastNum = 0
    } else if (num > maxX) {
      lastNum = maxX
    } else {
      lastNum = num
    }
  } else if (type === 'y') {
    if (num < 0) {
      lastNum = 0
    } else if (num > maxY) {
      lastNum = maxY
    } else {
      lastNum = num
    }
  }
  return lastNum
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
    // console.log('√', currComp.isShow) 
    emitter.emit('currComp', currComp.isShow)
  } else {
    // console.log('x', currComp.isShow) 
    currComp.isShow = false
  }
}

// 鼠标按下时的回调
function mouseDownStart(e: any) {
  // 记录鼠标按下瞬间的位置
  startPosition.x = e.clientX
  startPosition.y = e.clientY
  // 注册鼠标松开的事件
  document.addEventListener('mouseup', mouseUp)
}

// 鼠标松开的回调
function mouseUp(e: any) {
  // 移除事件
  document.removeEventListener('mouseup', mouseUp)
  // 更新组件数据
  // console.log('currComp', currComp.isShow);

  // 相对移动长度
  let offsetX = e.clientX - startPosition.x
  let offsetY = e.clientY - startPosition.y
  // 设置组件的位置
  let comp: any = document.getElementById(currComp.isShow.info.id)?.firstChild

  let left = boundaryLimit('x', currComp.isShow.position.left + offsetX, currComp.isShow)
  let top = boundaryLimit('y', currComp.isShow.position.top + offsetY, currComp.isShow)

  Object.assign(comp.style, {
    left: left + 'px',
    top: top + 'px'
  })

  currComp.isShow.position.left = left
  currComp.isShow.position.top = top
}

// 删除组件的右击回调
function rightClick() {
  if (confirm('确定要删除这个组件吗')) {
    document.getElementById(currComp.isShow.info.id)?.remove()
  }
  currComp.isShow = false
}
</script>

<template>
  <div id="canvasBox" class="wrapper" @dragover="dragOver" @drop="drop" @click="checkComp">
    <div v-for="(item, index) in components" :key="index" :id="item.info.id"></div>
    <div id="borderBox" @contextmenu.prevent="rightClick" @mousedown="mouseDownStart" class="borderStyle"
      v-if="currComp.isShow" :style="borderStyle">
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  flex: 1;
  background-color: #eee;
  position: relative;
  // 禁止选中文字
  user-select: none;

  .borderStyle {
    border: 3px solid greenyellow;
    position: absolute;
  }
}
</style>
