import type { IDebounce } from './types'

export const debounce: IDebounce = (callback, delay) => {
  let timerId: number

  return event => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = window.setTimeout(callback, delay, event)
  }
}
