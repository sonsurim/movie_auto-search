import type { IDebounce } from './types'

export const debounce: IDebounce = (callback, delay) => {
  let timerId: number

  return event => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(callback, delay, event)
  }
}
