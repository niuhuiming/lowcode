import TextComp from './TextComp'
import PicComp from './PicComp'
import TabList from './TabList'

let obj: any = {
  TextComp,
  PicComp,
  TabList
}

// info的type就是组件的名称
function getComponent(info: any, attr?: Array<any>, data?: string) {
  let component = obj[info.type](attr, data)
  component.info = info
  return component
}

export default getComponent;