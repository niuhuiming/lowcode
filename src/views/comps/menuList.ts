type Comp = {
  type: string,
  name: string
}

const menus: Array<Comp> = [
  {
    type: 'TextComp',
    name: '文本组件'
  },
  {
    type: 'PicComp',
    name: '图片组件'
  },
  {
    type: 'TabList',
    name: '菜单组件'
  },
  {
    type: 'VideoComp',
    name: '视频组件'
  },
  {
    type: 'LinkComp',
    name: '链接组件'
  },
]

export default menus