<script setup lang="ts">
import { ref, reactive } from 'vue'

const props = defineProps<{
  width: string | number,
  height: string | number,
  itemWidth: string | number,
  data?: any,
}>()

let dataList = reactive(JSON.parse(props.data).list)
let checkIndex = ref(0)

function setStyle() {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
  }
}

function setItemStyle() {
  return {
    width: props.itemWidth + 'px'
  }
}
</script>

<template>
  <div class="wrapper" :style="setStyle()">
    <div class="itemTab" :class="{ active: checkIndex === index }" :style="setItemStyle" @click="checkIndex = index"
      v-for="(item, index) in dataList" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .itemTab {
    background-color: white;
    color: #333;
    border-radius: 5px;
    text-align: center;

    &.active {
      color: white;
      background-color: #00f;
    }
  }
}
</style>