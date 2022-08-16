/**
 * 工具类
 */
import { createApp, h } from 'vue'
import TextComp from '../components/TextComp.vue'

function getAttrStr(attrs: Array<any>) {
  let attrStr = ''
  attrs.forEach(item => {
    attrStr += item.key + '=' + item.value + ' '
  })
  return attrStr
}

// 获取随机ID
export function getId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  // 返回一个字母开头的随机数
  return 'a' + s4() + s4() + '-' + s4()
  // 0x10000：以0x开始的数据表示16进制，10000转成十进制数就是65536，实际上这是为了后面获取四位数随机号码所以乘以10000，而为了获取包含字母在内的字符就用16进制。
}

export function mountedComponent(component: any) {
  let data: any = {}
  if (component.attribute) {
    component.attribute.forEach((item: any) => {
      data[item.key] = item.value
    })
  }

  const app = createApp({
    render() {
      return h(TextComp, {
        ...data,
        id: component.info.id,
        style: {
          position: 'absolute',
          top: `${component.position.top}px`,
          left: `${component.position.left}px`,
          zIndex: `${component.position.zIndex}`
        }
      })
    },
  })
  // 放入定时器中，否则不生效
  setTimeout(() => {
    app.mount(`#${component.info.id}`)
  })
}

export default getAttrStr