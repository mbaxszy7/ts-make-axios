import {
  CancelExecutor,
  CancelTokenSource,
  Canceler,
  CancelTokenConstructor,
  CancelTokenInterface
} from './../types/index'

import { Cancel } from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

const CancelToken: CancelTokenConstructor = class CancelToken implements CancelTokenInterface {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken((c: Canceler) => {
      cancel = c
    })
    return {
      token,
      cancel
    }
  }
}

export default CancelToken
