import { AxiosRequestConfig, AxiosPromise } from './types'
import { transformRequestData, transformResponseData } from './helper/data'
import { processHeaders } from './helper/headers'
import buildUrl from './helper/url'
import xhr from './xhr'

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequest(config: AxiosRequestConfig) {
  return transformRequestData(config.data)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildUrl(url, params)
}

function processConfig(config: AxiosRequestConfig) {
  config.headers = transformHeaders(config)
  config.data = transformRequest(config)
  config.url = transformUrl(config)
}

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transformResponseData(res.data)
    return res
  })
}

export default axios
