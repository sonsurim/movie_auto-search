import { Component, Input } from '@components'
import { ICON_SEARCH, ICON_CLOSE } from '@constants'
import { selectEl } from '@utils'
import styles from './SearchInput.module.scss'
import type { ISearchInput } from './types'

export default class SearchInput extends Component<ISearchInput> {
  handleInput: (e: any) => void
  handleClear: (e: any) => void

  template(): string {
    const { hide } = styles

    return `
      <div>
        <img src="${ICON_SEARCH}" />
        <Input></Input>
        <img src="${ICON_CLOSE}" data-btn="clear" class="${hide}"/>
      </div>
    `
  }

  init(): void {
    const { onChange } = this.state
    const { hide } = styles

    this.handleInput = (e): void => {
      const keyword = e.target.value
      const clearBtnEl = selectEl(this.node, '[data-btn="clear"]')

      if (keyword) {
        clearBtnEl.classList.remove(hide)
      } else {
        clearBtnEl.classList.add(hide)
      }

      onChange?.(keyword)
    }

    this.handleClear = (e): void => {
      const input = selectEl(this.node, 'Input') as HTMLInputElement
      const { btn } = e.target.dataset

      if (!btn) {
        return
      }

      input.value = ''
      e.target.classList.add(hide)
      onChange?.('')
    }
  }

  attachChildComponent(): void {
    new Input({
      node: selectEl(this.node, 'Input'),
      initalState: { onChange: this.handleInput }
    })
  }

  setEvent(): void {
    this.node.addEventListener('click', this.handleClear)
  }

  clearEvent(): void {
    this.node.removeEventListener('click', this.handleClear)
  }
}
