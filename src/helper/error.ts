import { AxiosRequestConfig, AxiosResponseConfig } from '../types'

class AxiosError extends Error {
  isAxiosError: boolean

  constructor(
    public message: string,
    public config: AxiosRequestConfig,
    public code?: string | null,
    public request?: any,
    public response?: AxiosResponseConfig
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // https://zhuanlan.zhihu.com/p/113019880
    if (typeof (Error as any).captureStackTrace === 'function') {
      ;(Error as any).captureStackTrace(this, new.target)
    }
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, new.target.prototype)
    } else {
      ;(this as any).__proto__ = new.target.prototype
    }
  }
}

export const createError = (
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponseConfig
) => {
  return new AxiosError(message, config, code, request, response)
}
