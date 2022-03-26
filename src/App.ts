import { Component, SearchInput } from '@components'
import type { IAppComponentState, IComponentParams } from '@models'
import { selectEl } from '@utils'

export default class App extends Component<IAppComponentState> {
  constructor({ node }: IComponentParams<IAppComponentState>) {
    const initalState = {
      keyword: ''
    }

    super({ node, initalState })
  }

  template(): string {
    return `
      <main id="#App">
        <div>App Component</div>
        <SearchInput></SearchInput>
      </main>
    `
  }

  attachChildComponent(): void {
    new SearchInput({
      node: selectEl(this.node, 'SearchInput'),
      initalState: {
        keyword: '',
        onChange: (keyword): void => {
          this.setState({
            keyword
          })

          if (!keyword) {
            return
          }

          console.log('api 호출!', this.state)
        }
      }
    })
  }
}
