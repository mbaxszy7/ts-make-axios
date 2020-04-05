import { AxiosTransformer } from '../types'

const transform = (data: any, fns: AxiosTransformer[], headers?: any) => {
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}

export default transform
