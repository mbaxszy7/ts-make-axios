const toString = Object.prototype.toString

// typeof new FormData()
// "object"
// export const isOject = (param: any): param is Object => {
//   return param !== null && typeof param === 'object'
// }

export const isPlainObject = (param: any): param is Object => {
  return toString.call(param) === '[object Object]'
}

export const isDate = (param: any): param is Date => {
  return toString.call(param) === '[object Date]'
}

export const extend = <T, U>(to: T, from: U): T & U => {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export const deepMerge = (...objs: any[]): any => {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
