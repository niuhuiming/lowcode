<script setup lang="ts">
import { ref, reactive } from 'vue'

const emit = defineEmits(["checkTabChange"])
const props = defineProps({
  checkIndex: Number
})

let tabList: Array<string> = reactive(['样式', '数据'])
let checkIndex = ref(props.checkIndex)

function checkTab(index: number) {
  checkIndex.value = index;
  emit("checkTabChange", checkIndex.value)
}
</script>

<template>
  <div class="wrapper">
    <div class="tabItem" :class="{ 'active': checkIndex === index }" v-for="(item, index) in tabList" :key="index"
      @click="checkTab(index)">
      {{ item }}
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #eee;

  .tabItem {
    padding: 15px;
    // 改变鼠标放上去的样式
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid red;
  }
}
</style>
