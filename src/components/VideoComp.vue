<script setup lang="ts">

import videoSource from '../assets/demo.mp4'

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
  <video class="wrapper" :style="setStyle()" :src="videoSource"></video>
</template>