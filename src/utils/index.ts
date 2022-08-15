/**
 * 工具类
 */
function getAttrStr(attrs: Array<any>) {
  let attrStr = ''
  attrs.forEach(item => {
    attrStr += item.key + '=' + item.value + ' ';
  })
  return attrStr
}

export default getAttrStr