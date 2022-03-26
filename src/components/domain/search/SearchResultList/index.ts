import { Component } from '@components'
import type { ISearchResultList } from './types'

export default class SearchResultList extends Component<ISearchResultList> {
  template(): string {
    const { listData, listVisible } = this.state

    return `
    <ul class="${listVisible ? '' : 'hide'}">
      ${listData
        .map(({ id, text }) => {
          return `<li data-id="${id}">${text}</li>`
        })
        .join('')}
    </ul>
    `
  }
}
