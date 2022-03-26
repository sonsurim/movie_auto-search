import { Component, Input } from '@components'
import { ICON_SEARCH, ICON_CLOSE } from '@constants'
import { selectEl } from '@utils'
import styles from './SearchInput.module.scss'
import type { ISearchInput } from './types'

export default class SearchInput extends Component<ISearchInput> {
  handleInput: (e: any) => void
  handleClear: (e: any) => void
  handleFocus: () => void
  handleBlur: () => void

  template(): string {
    const { inputWrapper, closeBtn } = styles

    return `
      <div class="${inputWrapper}">
        <img src="${ICON_SEARCH}" />
        <Input></Input>
        <img src="${ICON_CLOSE}" data-btn="clear" class="hide ${closeBtn}"/>
      </div>
    `
  }

  init(): void {
    const { onChange, onFocus } = this.state

    this.handleInput = (e): void => {
      const keyword = e.target.value
      const clearBtnEl = selectEl(this.node, '[data-btn="clear"]')

      if (keyword) {
        clearBtnEl.classList.remove('hide')
      } else {
        clearBtnEl.classList.add('hide')
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
      e.target.classList.add('hide')
      onChange?.('')
    }

    this.handleFocus = (): void => {
      onFocus(true)
    }

    this.handleBlur = (): void => {
      onFocus(false)
    }
  }

  attachChildComponent(): void {
    new Input({
      node: selectEl(this.node, 'Input'),
      initalState: {
        placeholder: '제목, 감독, 배우로 검색',
        onChange: this.handleInput,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }
    })
  }

  setEvent(): void {
    this.node.addEventListener('click', this.handleClear)
  }

  clearEvent(): void {
    this.node.removeEventListener('click', this.handleClear)
  }
}
