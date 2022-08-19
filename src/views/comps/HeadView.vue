<script setup lang="ts">
import emitter from '../../utils/emitter'

// 缓存组件
function save() {
  emitter.emit('compSave')
}

// 发布组件
function submit() {
  if (confirm('确定要发布吗')) {
    emitter.emit('compSubmit')
  }
}
</script>

<template>
  <div class="wrapper">
    <h3>头部标题</h3>
    <div class="btn-box">
      <div class="btn" @click="save">保存</div>
      <div class="btn" @click="submit">发布</div>
      <div class="btn active">
        <router-link to="/list">查看</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  background-color: #39c5bb;
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
