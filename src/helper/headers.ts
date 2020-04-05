import { Methods } from './../types/index'
import { isPlainObject, deepMerge } from './utils'

const normalizeHeaderName = (headers: any, normalizedName: string): void => {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export const processHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export const parseHeaders = (headers: string): object => {
  const parsedHeaders = Object.create(null)
  if (!headers) return parsedHeaders
  headers.split('\r\n').forEach(header => {
    if (!header) return
    let [key, val] = header.split(': ')
    if (!key) return
    key = key.trim().toLowerCase()
    val = val.trim()
    parsedHeaders[key] = val
  })
  return parsedHeaders
}

export const flattenHeaders = (headers: any, method: Methods): any => {
  if (!headers) return headers

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
