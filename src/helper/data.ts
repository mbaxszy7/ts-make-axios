import { isPlainObject } from './utils'

export const transformRequestData = (data: any): any => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export const transformResponseData = (data: any): any => {
  if (data && typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      return data
    }
  }
  return data
}
