interface IComponentParams<StateType> {
  node: Element
  initalState: StateType | null
  preventRenderStateKey?: string[]
}

type INewState<StateType> = {
  [Key in keyof StateType]?: StateType[keyof StateType]
}

export type { IComponentParams, INewState }
