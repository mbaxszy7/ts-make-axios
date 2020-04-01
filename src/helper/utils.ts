const toString = Object.prototype.toString

// typeof new FormData()
// "object"
// export const isOject = (param: any): param is Object => {
//   return param !== null && typeof param === 'object'
// }

export const isPlainOject = (param: any): param is Object => {
  return toString.call(param) === '[object Object]'
}

export const isDate = (param: any): param is Date => {
  return toString.call(param) === '[object Date]'
}
