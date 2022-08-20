import { createRouter, createWebHashHistory } from 'vue-router'

// 引入组件
import EditPage from '../views/EditPage.vue'
import ShowPage from '../views/ShowPage.vue'
import PageList from '../views/PageList.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: EditPage },
    { path: '/show/:id', component: ShowPage },
    { path: '/list', component: PageList }
  ]
})

export default router