<script setup lang="ts">
import HeadTab from './comps/HeadTab.vue'
import { ref, reactive } from 'vue'
import emitter from "../utils/emitter";

let checkIndex = ref(0)
let currComp: any = reactive({
  isShow: false,
  compMsg: {}
})

// 点击切换tab
function checkTabChange(index: number) {
  checkIndex.value = index
}

// 接收被点击组件的信息
emitter.on('currComp', (e) => {
  currComp.isShow = true
  currComp.compMsg = e
  console.log(e);
})

</script>


<template>
  <div class="wrapper">
    <HeadTab :checkIndex="checkIndex" @checkTabChange="checkTabChange"></HeadTab>
    <div v-if=currComp.isShow>
      <!-- 样式 -->
      <div v-if="checkIndex === 0">
        <div class="styleItem" v-for="(item, index) in currComp.compMsg.attribute" :key="index">
          <span class="label">{{ item.name }}:</span>
          <!-- type = input -->
          <input class="inputStyle" v-if="item.type === 'input'" type="text" v-model="item.value" />
          <!-- type = color -->
          <input class="inputStyle" v-if="item.type === 'color'" type="color" v-model="item.value" />
        </div>
      </div>
      <!-- 数据 -->
      <div v-if="checkIndex === 1">
        <textarea class="dataBox" v-model="currComp.compMsg.data.txt"></textarea>
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
