import { AxiosRequestConfig, AxiosResponseConfig, AxiosPromise } from '../types'
import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'
import { isURLSameOrigin } from '../helper/url'
import cookie from '../helper/cookie'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      method = 'get',
      url,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    request.open(method.toUpperCase(), url!)

    request.onreadystatechange = function handLoad() {
      if (request.readyState !== 4 || request.status === 0) {
        return
      }

      const responseData = responseType !== 'text' ? request.response : this.responseText

      const response: AxiosResponseConfig = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(request.getAllResponseHeaders()),
        config,
        request
      }
      if ((response.status >= 200 && response.status <= 300) || response.status === 304) {
        return resolve(response)
      } else {
        return reject(
          createError(
            `Request failed wih status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    request.onerror = function handleError(e) {
      return reject(createError('NetWork Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      return reject(
        createError(`timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request)
      )
    }

    if (withCredentials || (isURLSameOrigin(url!) && xsrfCookieName)) {
      const val = cookie.read(xsrfCookieName!)
      if (val && xsrfHeaderName && headers) {
        headers[xsrfHeaderName] = val
      }
    }

    if (headers) {
      Object.keys(headers).forEach(name => {
        if (data == null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    if (cancelToken) {
      // tslint:disable-next-line: no-floating-promises
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)
  })
}

export default xhr
