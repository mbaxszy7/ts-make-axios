import { AxiosRequestConfig, Methods } from './types'

function xhr(config: AxiosRequestConfig): void {
  const { data = null, method = Methods.GET, url } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url)

  request.send(data)
}

export default xhr
