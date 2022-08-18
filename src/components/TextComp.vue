<script setup lang="ts">
const props = defineProps<{
  width: string | number,
  height: string | number,
  color: string,
  fontSize: string | number,
  data: string,
}>()

function setStyle() {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
    color: props.color,
    fontSize: props.fontSize + 'px'
  }
}
</script>


<template>
  <div class="wrapper" :style="setStyle()">
    <span>{{ JSON.parse(data).txt }}</span>
  </div>
</template>