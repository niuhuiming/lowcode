<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { mountedComponent } from '../utils'

type Comp = {
  attribute: Array<any>,
  data: any,
  info: {
    id?: string,
    name: string,
    type: string
  },
  position: {
    left: number,
    top: number,
    zIndex: number
  }
}
// 该页面的组件列表
const components: Array<Comp> = reactive([])
// 用于获取路由传参
const router: any = useRoute();

// 生命周期：挂载前加载页面
onMounted(() => {
  const data = JSON.parse(JSON.parse(router.query.compMsg).pageStruct)
  data.forEach((component: Comp) => {
    components.push(component)
    mountedComponent(component)
  })
})
</script>

<template>
  <div v-for="(item, index) in components" :key="index" :id="item.info.id"></div>
</template>