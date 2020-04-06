import { transformRequestData, transformResponseData } from './helper/data'
import { AxiosRequestConfig } from './types/index'
import { processHeaders } from './helper/headers'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, tex/plain, */*'
    }
  },
  transformRequest: [
    (data: any, headers?: any): any => {
      processHeaders(headers, data)
      return transformRequestData(data)
    }
  ],
  transformResponse: [
    (data: any): any => {
      return transformResponseData(data)
    }
  ],

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  validateStatus(status: number): boolean {
    return (status >= 200 && status <= 300) || status === 304
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers![method] = {}
})

const methodWithData = ['post', 'put', 'patch']

methodWithData.forEach(method => {
  defaults.headers![method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
