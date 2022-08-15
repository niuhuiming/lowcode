import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import myComps from './components/index'

const app = createApp(App)
// myComps: 将组件库的组件挂载到全局
app.use(myComps)
app.mount('#app')