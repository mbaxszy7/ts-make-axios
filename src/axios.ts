import { extend } from './helper/utils'
import { AxiosInstance } from './types/index'
import Axios from './core/Axios'

// instance 不仅仅拥有 Axios 类实例的所有方法本身也可以作为一个函数被调用
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
