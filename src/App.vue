<script setup lang="ts">
import HeadView from "./views/HeadView.vue";
import LeftView from "./views/LeftView.vue";
import CenterView from "./views/CenterView.vue";
import RightView from "./views/RightView.vue";
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
