interface ISearchInput {
  keyword: string
  onFocus(listVisible: boolean): void
  onChange(keyword: string): void
}

export type { ISearchInput }
