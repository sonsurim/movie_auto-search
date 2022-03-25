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

/** API Response */
type IApiResponse = typeof DEFAULT_RESPONSE

export type { IComponentParams, INewState, IApiResponse }
