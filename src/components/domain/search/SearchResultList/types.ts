import type { IListItem } from '@models'

interface ISearchResultList {
  listData: IListItem[]
  listVisible: boolean
  currentKeywordId: number | null
}

export type { ISearchResultList }
