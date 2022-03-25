import { Component } from '@components'
import type { IInput } from './types'

export default class Input extends Component<IInput> {
  template(): string {
    return `
      <input type="text" />
    `
  }

  setEvent(): void {
    this.node.addEventListener('input', this.state.onChange)
  }

  clearEvent(): void {
    this.node.removeEventListener('input', this.state.onChange)
  }
}
