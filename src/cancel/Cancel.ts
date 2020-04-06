import { Cancel as CancelInterface } from '../types'

export class Cancel implements CancelInterface {
  message?: string
  constructor(message?: string) {
    this.message = message
  }
}

export const isCancel: (val: any) => boolean = (val: any) => {
  return val instanceof Cancel
}
