<script setup lang="ts">

import picSource from '../assets/logo.png'

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
  <img class="wrapper" :style="setStyle()" :src="picSource">
</template>