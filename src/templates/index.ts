import TextComp from './TextComp'
import PicComp from './PicComp'

let obj: any = {
  TextComp,
  PicComp
}

// info的type就是组件的名称
function getComponent(info: any, attr?: Array<any>, data?: any) {
  let component = obj[info.type](attr, data)
  component.info = info
  return component
}

export default getComponent;