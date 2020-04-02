import { RejectedFn, ResolvedFn, AxiosInterceptorManager } from './../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> implements AxiosInterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[]
  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn) {
    this.interceptors.push({ resolved, rejected })
    return this.interceptors.length - 1
  }

  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  forEach(fn: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor) fn(interceptor)
    })
  }
}
