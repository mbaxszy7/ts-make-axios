import { AxiosRequestConfig, AxiosPromise, AxiosTransformer } from '../types'
import { flattenHeaders } from '../helper/headers'
import buildUrl from '../helper/url'
import xhr from './xhr'
import transform from './transform'

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildUrl(url!, params)
}

function processConfig(config: AxiosRequestConfig) {
  config.data = transform(
    config.data,
    config.transformRequest as AxiosTransformer[],
    config.headers
  )
  config.url = transformUrl(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function throwIfCanceled(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCanceled(config)
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transform(res.data, config.transformResponse as AxiosTransformer[], config.headers)
    return res
  })
}

export default dispatchRequest
