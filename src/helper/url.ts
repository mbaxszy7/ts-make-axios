import { isDate, isPlainObject, isURLSearchParams } from './utils'
import { URLOrigin } from '../types'
/**
 * rebuild url & params
 * params:
 * 1. {a:1, b:2} -> a=1&b=2
 * 2. {foo: ["bar", "baz"]} -> foo[]=bar&foo[]=baz
 * 3. {foo: { bar: "baz" }} -> foo=%7B%22bar%22:%22baz%22%7D，foo 后面拼接的是  {"bar":"baz"} encode 后的结果
 * 4. {date: new Date()} -> date=2019-04-01T05:55:39.030Z，date 后面拼接的是 date.toISOString()
 * 5. 对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode。
 * 6. { foo: 'bar', baz: null } -> 空值忽略
 * 7. 丢弃 url 中的哈希标记
 * 8. 保留 url 中已存在的参数
 */

/**
 * params 处理流程： key -value -> value : 1. array , 2. object, 3. string, 4. Date, 5. null || undefined
 * url 处理流程：丢弃 url 中的哈希标记, 保留 url 中已存在的参数
 * encode key & value
 */

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

const buildUrl = (
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string => {
  if (!params) return url
  let quries = ''
  if (paramsSerializer) quries = paramsSerializer(params)
  else if (isURLSearchParams(params)) quries = params.toString()
  else if (typeof params === 'object') {
    quries = Object.keys(params).reduce((preParts, key) => {
      const val = params[key]
      let nowPart = ''
      if (val == null) {
        return preParts
      } else if (Array.isArray(val)) {
        nowPart = val.reduce(
          (acc, k) =>
            k
              ? acc
                ? `${acc}&${encode(key)}[]=${encode(k)}`
                : `${encode(key)}[]=${encode(k)}`
              : '',
          ''
        )
      } else if (isPlainObject(val)) {
        try {
          nowPart = `${encode(key)}=${encode(JSON.stringify(val))}`
        } catch (e) {
          nowPart = ''
        }
      } else if (isDate(val)) {
        nowPart = `${encode(key)}=${encode(val.toISOString())}`
      } else {
        nowPart = `${encode(key)}=${encode(val)}`
      }

      return nowPart ? (preParts ? `${preParts}&${nowPart}` : nowPart) : preParts
    }, '')
  }
  const hashTagIndex = url.indexOf('#')
  if (hashTagIndex !== -1) {
    url = url.slice(0, hashTagIndex)
  }

  url += (url.indexOf('?') === -1 ? '?' : '&') + quries
  return url
}

export default buildUrl

const urlParsingURL = document.createElement('a')

const resolveURL = (url: string): URLOrigin => {
  urlParsingURL.setAttribute('href', url)
  const { host, protocol } = urlParsingURL
  return {
    host,
    protocol
  }
}

const currentOrigin = resolveURL(window.location.href)

export const isURLSameOrigin = (requestURL: string): boolean => {
  const parsedOrigin = resolveURL(requestURL)
  return (
    currentOrigin.host === parsedOrigin.host && currentOrigin.protocol === currentOrigin.protocol
  )
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
