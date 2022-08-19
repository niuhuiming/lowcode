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
    <a :href="JSON.parse(data).href" target="_blank">{{ JSON.parse(data).txt }}</a>
  </div>
</template>

<style scoped lang="less">
.wrapper a {
  text-decoration: none;
}
</style>