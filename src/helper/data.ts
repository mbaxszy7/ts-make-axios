import { isPlainOject } from './utils'

export const transformRequestData = (data: any): any => {
  if (isPlainOject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export const transformResponseData = (data: any): any => {
  console.log(data, typeof data)
  if (data && typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      return data
    }
  }
  return data
}
