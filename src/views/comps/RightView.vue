<script setup lang="ts">
import { ref, reactive } from 'vue'
import getComponent from '../../templates'
import { mountedComponent } from '../../utils'
import emitter from "../../utils/emitter"
import HeadTab from './HeadTab.vue'

let checkIndex = ref(0)
const currComp: any = reactive({ isShow: false })
// 对data对象特殊处理，防止[object  Object]的问题
let dataStr = ref('')

// 接收被点击组件的信息
emitter.on('currComp', (e) => {
  currComp.isShow = e
  dataStr.value = JSON.stringify(currComp.isShow.data)
})

// 切换tab
function checkTabChange(index: number) {
  checkIndex.value = index
}

// 组件样式的响应
function updateComp() {
  // 1.获取组件数据
  let component = getComponent(currComp.isShow.info, currComp.isShow.attribute, dataStr.value)
  // 2.设置组件的位置
  component.position = currComp.isShow.position
  // 3.重新挂载组件
  mountedComponent(component)
}
</script>

<template>
  <div class="wrapper">
    <HeadTab :checkIndex="checkIndex" @checkTabChange="checkTabChange"></HeadTab>
    <div v-if=currComp.isShow>
      <!-- 样式 -->
      <div v-if="checkIndex === 0">
        <div class="styleItem" v-for="(item, index) in currComp.isShow.attribute" :key="index">
          <span class="label">{{ item.name }}:</span>
          <input class="inputStyle" v-if="item.type === 'input'" type="text" v-model="item.value" @blur="updateComp" />
          <input class="inputStyle" v-if="item.type === 'color'" type="color" v-model="item.value"
            @change="updateComp" />
        </div>
      </div>
      <!-- 数据 -->
      <div v-if="checkIndex === 1">
        <textarea class="dataBox" v-model="dataStr" @change="updateComp"></textarea>
      </div>
    </div>
    <div v-else style="padding: 15px;">当前没有正在编辑的组件</div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 350px;

  .styleItem {
    margin: 10px;
    display: flex;

    .label {
      display: inline-block;
      width: 80px;
    }

    .inputStyle {
      flex: 1 0;
    }
  }

  .dataBox {
    min-height: 300px;
    margin: 15px;
    width: 90%;
  }
}
</style>
