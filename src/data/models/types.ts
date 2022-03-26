import { API_REQUEST } from '@constants'

const { DEFAULT_RESPONSE } = API_REQUEST

/** Component */
interface IComponentParams<StateType> {
  node: Element
  initalState: StateType | null
  preventRenderStateKey?: string[]
}

type INewState<StateType> = {
  [Key in keyof StateType]?: StateType[keyof StateType]
}

interface IAppComponentState {
  keyword: string
  listData: IListItem[]
}

interface IListItem {
  id: number
  text: string
}

/** API Response */
type IApiResponse = typeof DEFAULT_RESPONSE

export type {
  IAppComponentState,
  IComponentParams,
  INewState,
  IApiResponse,
  IListItem
}
