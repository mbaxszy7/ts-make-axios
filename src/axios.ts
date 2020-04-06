import { extend } from './helper/utils'
import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import { Cancel, isCancel } from './cancel/Cancel'

// instance 不仅仅拥有 Axios 类实例的所有方法本身也可以作为一个函数被调用
function createInstance(initConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(initConfig)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.isCancel = isCancel
axios.Cancel = Cancel
axios.Axios = Axios

export default axios
