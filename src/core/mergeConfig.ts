import { AxiosRequestConfig, AxiosTransformer } from './../types/index'
import { isPlainObject, deepMerge } from '../helper/utils'

// const keyFromConfig2 = ['url', 'params', 'data']

const deepMergeHeaders = (val1: any, val2?: any): any => {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

const mergeTransform = (
  defaultTransformers: AxiosTransformer[],
  passedTransformers: AxiosTransformer | AxiosTransformer[],
  tranformType: string
): AxiosTransformer[] => {
  if (!Array.isArray(passedTransformers)) {
    passedTransformers = [passedTransformers]
  }
  return tranformType === 'transformRequest'
    ? [...passedTransformers, ...defaultTransformers]
    : [...defaultTransformers, ...passedTransformers]
}

const mergeConfig = (
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig => {
  if (!config2) config2 = {}
  const copiedConfig2 = Object.create(null)
  Object.keys(config2).forEach(k => {
    if (k === 'transformRequest' || k === 'transformResponse') {
      copiedConfig2[k] = mergeTransform(config1[k] as AxiosTransformer[], config2![k]!, k)
    } else if (k === 'headers' || k === 'auth') {
      const headers = deepMergeHeaders(config1[k], config2![k])
      copiedConfig2[k] = headers
    } else if (config2![k] != null) {
      copiedConfig2[k] = config2![k]
    }
  })

  return { ...config1, ...copiedConfig2 }
}

export default mergeConfig
