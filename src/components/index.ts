import TextComp from './TextComp.vue'

let obj: any = {
  TextComp
}

/**
 * install(): 挂载全局组件。app.use()时调用
 */
function install(Vue: any) {
  Object.keys(obj).forEach(key => Vue.component(key, obj[key]))
}

export default {
  version: '1.0',
  install
}