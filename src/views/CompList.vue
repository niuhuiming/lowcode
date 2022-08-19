<script setup lang="ts">
import { reactive, onMounted } from 'vue'

let compArr: any = reactive([])

// 挂载前查看之前是否保存
onMounted(() => {
  // TODO: 发送请求/api/getList，将返回数据赋值给compsArr
  compArr
})
</script>

<template>
  <ul>
    <li v-for="comp in compArr" :key="comp.id">
    </li>
  </ul>
  123
</template>