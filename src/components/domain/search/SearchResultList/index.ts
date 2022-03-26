import { Component } from '@components'
import type { ISearchResultList } from './types'

export default class SearchResultList extends Component<ISearchResultList> {
  template(): string {
    const { listData, listVisible, currentKeywordId } = this.state

    return `
    <ul class="${listVisible ? '' : 'hide'}">
      ${listData
        .map(({ id, text }, idx) => {
          return `
            <li data-id="${id}" ${
            currentKeywordId === idx + 1 ? 'style="color: red;"' : ''
          }>${text}</li>`
        })
        .join('')}
    </ul>
    `
  }
}
