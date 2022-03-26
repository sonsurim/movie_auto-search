import { Component } from '@components'
import type { IInput } from './types'

export default class Input extends Component<IInput> {
  template(): string {
    const { placeholder } = this.state

    return `
      <input type="text" placeholder="${placeholder || ''}"/>
    `
  }

  setEvent(): void {
    this.node.addEventListener('input', this.state.onChange)
    this.node.addEventListener('focus', this.state.onFocus)
    this.node.addEventListener('blur', this.state.onBlur)
  }

  clearEvent(): void {
    this.node.removeEventListener('input', this.state.onChange)
    this.node.removeEventListener('focus', this.state.onFocus)
    this.node.removeEventListener('blur', this.state.onBlur)
  }
}
