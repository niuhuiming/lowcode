/**
 * 工具类
 */
import { createApp, h } from 'vue'
import { Comps } from '../components'
import axios from 'axios'

// 获取随机ID
export function getId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  // 返回一个字母开头的随机数
  return 'a' + s4() + s4() + '-' + s4()
  // 0x10000：以0x开始的数据表示16进制，10000转成十进制数就是65536，实际上这是为了后面获取四位数随机号码所以乘以10000，而为了获取包含字母在内的字符就用16进制。
}

// 挂载组件
export function mountedComponent(component: any) {
  let data: any = {}
  if (component.attribute) {
    component.attribute.forEach((item: any) => {
      data[item.key] = item.value
    })
  }

  // createApp(): 创建一个应用实例。第一个参数是根组件，第二个参数（可选）是要传递给根组件的props
  const app = createApp({
    render() {
      // h(): 创建虚拟dom节点
      return h(Comps[component.info.type], {
        ...data,
        data: JSON.stringify(component.data),
        style: {
          position: 'absolute',
          top: `${component.position.top}px`,
          left: `${component.position.left}px`,
          zIndex: `${component.position.zIndex}`
        }
      })
    },
  })
  // 放入定时器中，否则不会挂载
  setTimeout(() => {
    app.mount(`#${component.info.id}`)
  })
}

// 发布页面
export function publishPage(data: any) {
  axios({
    url: 'http://127.0.0.1:3000/api/publish',
    method: 'post',
    data,
  }).then((value) => {
    if (!value.data.status) {
      alert('发生了错误，请于控制台查看')
      console.log('Error', value.data.msg)
    }
  })
};

// 获取页面列表
export function getPageList() {
  return axios({
    url: 'http://127.0.0.1:3000/api/getList',
    method: 'get',
  })
}