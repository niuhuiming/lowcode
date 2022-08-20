<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getPageList } from '../utils'

let compArr: any = reactive({ compsMsg: [] })

// 生命周期：挂载前请求页面列表
onMounted(() => {
  getPageList().then((value) => {
    compArr.compsMsg = JSON.parse(value.data.msg)
  })
})
</script>

<template>
  <div class="wrapper">
    <h3> 页面列表 </h3>
  </div>
  <div class="listBox">
    <ul>
      <li v-for="comp in compArr.compsMsg" :key="comp.pageID">
        <router-link :to="{ path: '/show/' + comp.pageID, query: { compMsg: JSON.stringify(comp) } }">{{ comp.pageRemark }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  background-color: #555;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0 15px;
}

.listBox {
  li {
    height: 100px;
    width: 100px;
    text-align: center;
    line-height: 100px;
  }
}
</style>