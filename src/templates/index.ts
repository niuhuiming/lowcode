import TextComp from './TextComp'

interface TextComp {
  type: 'info'
}

let obj: any = {
  TextComp
}

// info的type就是组件的名称
function getComponent(info: TextComp) {
  let component = obj[info.type]()
  component.info = info
  return component
}

export default getComponent;