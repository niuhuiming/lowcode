function handle(attr: Array<any>, dataStr: string) {
  let attribute = [
    {
      key: 'width',
      name: '宽度',
      value: '100',
      type: 'input',
      placeholder: '请输入宽度'
    },
    {
      key: 'height',
      name: '高度',
      value: '40',
      type: 'input',
      placeholder: '请输入高度'
    },
    {
      key: 'color',
      name: '文本颜色',
      value: '#ff0000',
      type: 'color',
      placeholder: '请选择颜色'
    },
    {
      key: 'fontSize',
      name: '字体大小',
      value: '14',
      type: 'input',
      placeholder: '请输入字体大小'
    },
  ]
  if (attr) {
    attribute = attr
  }
  let data = { txt: '链接默认文本', href: 'https://www.baidu.com' }
  if (dataStr) {
    data = JSON.parse(dataStr)
  }
  return { attribute, data }
}

export default handle