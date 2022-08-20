<script setup lang="ts">
import { reactive, computed, StyleValue, onMounted } from 'vue'
import getComponent from '../../templates'
import { getId, mountedComponent, publishPage } from '../../utils'
import emitter from '../../utils/emitter'

type Position = {
  x: number,
  y: number
}
type Comp = {
  attribute: Array<any>,
  data: any,
  info: {
    id?: string,
    name: string,
    type: string
  },
  position: {
    left: number,
    top: number,
    zIndex: number
  }
}

const components: Array<Comp> = reactive([])
const currComp: any = reactive({ isShow: false })
// 组件的位置信息
let zIndex: number = 0
const startPosition: Position = { x: 0, y: 0 }

// 生命周期：挂载前查看之前是否暂存
onMounted(() => {
  const dataStr = localStorage.getItem('comps')
  if (dataStr) {
    const data = JSON.parse(dataStr)
    data.forEach((component: any) => {
      components.push(component)
      mountedComponent(component)
    })
  }
})

// 暂存页面
emitter.on('pageSave', () => {
  localStorage.setItem('comps', JSON.stringify(components))
})

// 发布页面
emitter.on('pagePublish', (pageRemark) => {
  const data = {
    pageRemark,
    pageStruct: components,
    pageGenerateTime: Date.now()
  }
  publishPage(data)
})

// 计算属性，显示被点击组件的边框
const borderStyle = computed(function () {
  // 组件的宽和高，即为边框的宽和高
  let compWidth: number = 0, compHeight: number = 0
  currComp.isShow.attribute.forEach((item: any) => {
    if (item.key === 'width') {
      compWidth = item.value
    } else if (item.key === 'height') {
      compHeight = item.value
    }
  })

  return {
    width: `${compWidth}px`,
    height: `${compHeight}px`,
    left: `${currComp.isShow.position.left}px`,
    top: `${currComp.isShow.position.top}px`,
    zIndex: `${currComp.isShow.position.zIndex}`
  } as StyleValue
})

// 拖拽到画布的回调
function dragOver(e: DragEvent) {
  e.preventDefault()
}

// 拖拽到画布鼠标松开的回调
function drop(e: DragEvent) {
  e.preventDefault()

  const info: object = {
    ...JSON.parse((e.dataTransfer)!.getData('info')),
    id: getId()
  }
  // 得到组件的属性、数据
  const component = getComponent(info)  // attribute, data, info, position
  // 找到组件的宽高
  let compWidth: number = 0, compHeight: number = 0
  component.attribute.forEach((item: any) => {
    if (item.key === 'width') {
      compWidth = item.value
    } else if (item.key === 'height') {
      compHeight = item.value
    }
  })
  // 设置组件的位置，将拖拽的组件放入数组中
  const left: number = Math.max(e.offsetX - compWidth / 2, 0)
  const top: number = Math.max(e.offsetY - compHeight / 2, 0)
  zIndex++
  component.position = { left, top, zIndex }
  components.push(component)
  // 挂载组件
  mountedComponent(component)
}

// 通过事件冒泡找到被点击的元素
function checkComp(e: Event) {
  let node: HTMLElement = e.target as HTMLElement
  const reg: RegExp = /a\w{8}-\w{4}/
  let count: number = 20 // 最大寻找次数，防止死循环

  while (node && !reg.test(node.id)) {
    if (count-- < 0) {
      return
    }
    node = node.parentNode as HTMLElement
  }

  if (node && node.id) {
    // 得到被点击的组件后将其信息保存下来
    currComp.isShow = components.find((item: any) => {
      if (item.info.id === node.id) {
        return item
      }
    })
    // 提交给右侧工具栏显示信息
    emitter.emit('currComp', currComp.isShow) // attribute, data, info, position
  } else {
    // 未得到组件，isShow置为false
    currComp.isShow = false
  }
}

// 边界限定
function boundaryLimit(type: 'x' | 'y', num: number, comp: any) {
  // 画布的宽高
  const canvas: HTMLElement = document.getElementById('canvasBox')!
  const canvasWidth = canvas.clientWidth, canvasHeight = canvas.clientHeight
  // 组件的宽高
  let compWidth = 0, compHeight = 0
  comp.attribute.forEach((item: any) => {
    if (item.key === 'width') {
      compWidth = item.value
    }
    if (item.key === 'height') {
      compHeight = item.value
    }
  })
  // 边界值
  const maxX = canvasWidth - compWidth, maxY = canvasHeight - compHeight

  if (type === 'x') {
    num = Math.min(Math.max(0, num), maxX)
  } else if (type === 'y') {
    num = Math.min(Math.max(0, num), maxY)
  }
  return num
}

// 移动组件鼠标按下时的回调
function mouseDownStart(e: MouseEvent) {
  // 记录鼠标按下瞬间的位置
  startPosition.x = e.clientX
  startPosition.y = e.clientY
  // 注册鼠标松开的事件
  document.addEventListener('mouseup', mouseUp)
}

// 移动组件，鼠标松开的回调
function mouseUp(e: MouseEvent) {
  // 移除鼠标松开事件
  document.removeEventListener('mouseup', mouseUp)

  // 相对移动长度
  const offsetX: number = e.clientX - startPosition.x
  const offsetY: number = e.clientY - startPosition.y
  // 计算组件的最终的位置
  let left = boundaryLimit('x', currComp.isShow.position.left + offsetX, currComp.isShow)
  let top = boundaryLimit('y', currComp.isShow.position.top + offsetY, currComp.isShow)

  let comp: any = (document.getElementById(currComp.isShow.info.id)!.firstChild)!
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
    components.splice(components.findIndex(item => item.info.id === currComp.isShow.info.id), 1)
    currComp.isShow = false
  }
}
</script>

<template>
  <div id="canvasBox" class="wrapper" @dragover="dragOver" @drop="drop" @click="checkComp">
    <div v-for="(item, index) in components" :key="index" :id="item.info.id"></div>
    <div id="borderBox" class="borderStyle" v-if="currComp.isShow" :style="borderStyle"
      @contextmenu.prevent="rightClick" @mousedown="mouseDownStart">
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
