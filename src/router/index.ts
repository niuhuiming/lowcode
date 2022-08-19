import { createRouter, createWebHashHistory } from 'vue-router'

// 引入组件
import EditComp from '../views/EditComp.vue'
import ShowComp from '../views/ShowComp.vue'
import CompList from '../views/CompList.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: EditComp },
    { path: '/show/:id', component: ShowComp },
    { path: '/list', component: CompList }
  ]
})

export default router