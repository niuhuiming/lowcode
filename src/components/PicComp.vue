<script setup lang="ts">
const props = defineProps<{
  width: string | number,
  height: string | number,
  data?: any,
}>()

function setStyle() {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
  }
}
</script>

<template>
  <img class="wrapper" :style="setStyle()" :src="`../src/assets/${JSON.parse(data).filename}`">
</template>