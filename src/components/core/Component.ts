import type { IComponentParams, INewState } from '@models'
import { convertTemplateAsComponent } from '@utils'

export default class Component<StateType> {
  node: Element
  state: StateType
  preventRenderStateKey: Set<string>
  needRender: boolean
  needUpdate: boolean
  subscribers: Set<any>

  constructor({
    node,
    initalState,
    preventRenderStateKey = []
  }: IComponentParams<StateType>) {
    this.node = node
    this.state = initalState
    this.preventRenderStateKey = new Set(preventRenderStateKey)
    this.needRender = false
    this.needUpdate = false
    this.subscribers = new Set([])

    this.init()
    this.render()
    this.fetch()
  }

  template(): string {
    return ``
  }

  init(): void {
    return
  }

  fetch(): void {
    return
  }

  render(): void {
    convertTemplateAsComponent.call(this)
    this.setEvent()
    this.attachChildComponent()
  }

  update(): void {
    this.needRender = false
    this.clearEvent()
    this.render()
  }

  updateChildren(): void {
    this.needRender = false
    this.attachChildComponent()
  }

  setEvent(): void {
    return
  }

  clearEvent(): void {
    return
  }

  attachChildComponent(): void {
    return
  }

  subscribe(...subscribers: any[]): void {
    subscribers.forEach(subscriber => {
      this.subscribers.add(subscriber)
    })
  }

  notify(newState: INewState<StateType>): void {
    const subscribers = Array.from(this.subscribers)

    const validSubscribers = subscribers.filter(
      subscriber => subscriber.validationState(newState).length
    )

    validSubscribers?.forEach(subscriber => {
      subscriber.setState(newState)

      if (subscriber.needRender) {
        subscriber.update()
        return
      }

      subscriber.updateChildren()
    })
  }

  validationState(newState: INewState<StateType>): string[] {
    const currentState = { ...this.state } as StateType
    const validState = Object.keys(newState).filter(_key =>
      currentState.hasOwnProperty(_key)
    )

    this.needUpdate = validState.length > 0
    return validState
  }

  setState(newState: INewState<StateType>): void {
    const validState = this.validationState(newState)

    if (!this.needUpdate) {
      return
    }

    const currentState = { ...this.state } as StateType
    const preventRenderStateKey = Array.from(this.preventRenderStateKey)

    validState?.forEach(key => {
      const stateKey = key as keyof INewState<StateType>

      if (!preventRenderStateKey.includes(key)) {
        this.needRender = true
      }

      currentState[stateKey] = newState[stateKey]
    })

    this.state = currentState
    this.notify(newState)
  }
}
