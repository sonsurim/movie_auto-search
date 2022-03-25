type ICreateEl = (
  tagName: string,
  attribute?: string,
  options?: string[] | number[]
) => Element

type ISelectEl = (target: Element | Document, selector: string) => Element

type ISelectAllEl = (
  target: Element | Document,
  selector: string
) => NodeListOf<Element>

export type { ICreateEl, ISelectEl, ISelectAllEl }
