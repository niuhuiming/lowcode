<script setup lang="ts">
const props = withDefaults(defineProps<{
  width: string | number,
  height: string | number,
  color: string,
  fontSize: string | number,
  // data可选
  data?: string,
}>(), {
  data: '这里是默认值'
})

function setStyle() {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
    color: props.color,
    fontSize: props.fontSize
  }
}
</script>


<template>
  <div class="wrapper" :style="setStyle()">
    <span>{{ data }}</span>
  </div>
</template>