<script setup lang="ts">
// 此页面用于查看某个已保存的comp
import { useRoute } from 'vue-router';
const router = useRoute();
console.log('id：' + router.params.id);
</script>

<template>
  ShowComp
</template>

<style scoped>
</style>
