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
      value: '100',
      type: 'input',
      placeholder: '请输入高度'
    },
  ];
  if (attr) {
    attribute = attr
  }
  let data = { filename: 'logo.png' }
  if (dataStr) {
    data = JSON.parse(dataStr)
  }
  return { attribute, data }
}

export default handle