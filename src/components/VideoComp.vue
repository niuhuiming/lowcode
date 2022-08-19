<script setup lang="ts">
const props = defineProps<{
  width: string | number,
  height: string | number,
  data: string,
}>()

function setStyle() {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
  }
}
</script>


<template>
  <video class="wrapper" :style="setStyle()" :src="`../src/assets/${JSON.parse(data).filename}`"></video>
</template>