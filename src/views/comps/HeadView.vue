<script setup lang="ts">
import emitter from '../../utils/emitter'

// 暂存组件
function save() {
  emitter.emit('pageSave')
}

// 发布组件
function submit() {
  const pageRemark = prompt('该页面的名称为')
  if (pageRemark) {
    emitter.emit('pagePublish', pageRemark)
  }
}
</script>

<template>
  <div class="wrapper">
    <h2>编辑页面</h2>
    <div class="btn-box">
      <div class="btn" @click="save">暂存</div>
      <div class="btn" @click="submit">发布</div>
      <div class="btn">
        <router-link to="/list">查看</router-link>
      </div>
    </div>
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

  .btn-box {
    display: flex;
    width: 200px;
    justify-content: space-around;

    a {
      text-decoration: none;
    }

    .btn {
      background-color: white;
      color: #333;
      font-size: 13px;
      padding: 2px 10px;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        color: white;
        background-color: #00f;
      }
    }
  }
}
</style>
