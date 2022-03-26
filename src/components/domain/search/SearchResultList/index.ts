import { Component } from '@components'
import styles from './SearchResult.module.scss'
import type { ISearchResultList } from './types'

export default class SearchResultList extends Component<ISearchResultList> {
  template(): string {
    const { listWrapper, selected } = styles
    const { listData, listVisible, currentKeywordId } = this.state

    return `
    <ul class="${listVisible ? '' : 'hide'} ${listData.length && listWrapper}">
      ${listData
        ?.map(({ id, text }, idx) => {
          return `
            <li data-id="${id}" ${
            currentKeywordId === idx + 1 ? `class="${selected}"` : ''
          }>${text}</li>`
        })
        .join('')}
    </ul>
    `
  }
}
