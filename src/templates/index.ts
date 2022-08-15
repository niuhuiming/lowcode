import TextComp from './TextComp'

interface TextComp {
  type: 'info'
}

let obj: any = {
  TextComp
}

// info的type就是组件的名称
function getComponent(info: TextComp) {
  return obj[info.type];
}

export default getComponent;