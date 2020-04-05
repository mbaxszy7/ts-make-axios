import {
  AxiosRequestConfig,
  AxiosPromise,
  Methods,
  AxiosResponseConfig,
  ResolvedFn,
  RejectedFn,
  AxiosInterface
} from './../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponseConfig>
}
// ((config: AxiosRequestConfig) => AxiosPromise)
interface PromiseChain<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class Axios implements AxiosInterface {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponseConfig>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (url && typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    return chain.reduce((prePromise, inter) => {
      const { resolved, rejected } = inter
      return prePromise.then(resolved, rejected)
    }, Promise.resolve(config))
  }

  private requestWithoutData(method: Methods, url: string, config?: AxiosRequestConfig) {
    return this.request({ ...(config || {}), method, url })
  }

  private requestWithData(method: Methods, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request({ ...(config || {}), method, url, data })
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWithData('patch', url, data, config)
  }
}
