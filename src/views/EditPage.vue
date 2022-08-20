<script setup lang="ts">
import HeadView from "./comps/HeadView.vue"
import LeftView from "./comps/LeftView.vue"
import CenterView from "./comps/CenterView.vue"
import RightView from "./comps/RightView.vue"
</script>

<template>
  <HeadView></HeadView>
  <div class="content-box">
    <LeftView></LeftView>
    <CenterView></CenterView>
    <RightView></RightView>
  </div>
</template>

<style scoped>
.content-box {
  display: flex;
  height: calc(100vh - 80px);
}
</style>
