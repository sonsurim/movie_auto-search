import { Component, SearchInput, SearchResultList } from '@components'
import type { IAppComponentState, IComponentParams } from '@models'
import { getMovieList } from '@services'
import { selectEl, debounce } from '@utils'

export default class App extends Component<IAppComponentState> {
  handleKeyup: (e: any) => void
  handleChange: (keyword: string) => void

  constructor({ node }: IComponentParams<IAppComponentState>) {
    const initalState = {
      keyword: '',
      listData: [],
      listVisible: false,
      currentKeywordId: null
    } as IAppComponentState

    super({ node, initalState })
  }

  template(): string {
    return `
      <main id="#App">
        <SearchInput></SearchInput>
        <SearchResultList></SearchResultList>
      </main>
    `
  }

  init(): void {
    this.handleKeyup = (e): void => {
      if (!(e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        return
      }

      const { currentKeywordId, listData } = this.state
      const lastChild = listData.length > 0 && listData.length

      switch (currentKeywordId) {
        case null:
          e.key === 'ArrowDown' &&
            this.setState({
              currentKeywordId: 0
            })
          break
        case 1:
          this.setState({
            currentKeywordId:
              e.key === 'ArrowUp' ? lastChild : currentKeywordId + 1
          })
          break
        case lastChild:
          this.setState({
            currentKeywordId: e.key === 'ArrowUp' ? currentKeywordId - 1 : 1
          })
          break
        default:
          this.setState({
            currentKeywordId:
              e.key === 'ArrowUp' ? currentKeywordId - 1 : currentKeywordId + 1
          })
      }
    }

    this.handleChange = debounce(async (keyword): Promise<any> => {
      const listData = await getMovieList(keyword)

      this.setState({
        listVisible: true,
        listData
      })
    }, 200)
  }

  attachChildComponent(): void {
    const { listData, listVisible, currentKeywordId } = this.state

    new SearchInput({
      node: selectEl(this.node, 'SearchInput'),
      initalState: {
        keyword: '',
        onFocus: (listVisible): void => {
          this.setState({
            listVisible
          })
        },
        onChange: (keyword): void => {
          this.setState({
            keyword,
            currentKeywordId: null
          })

          if (!keyword) {
            this.setState({
              listVisible: false,
              listData: []
            })
            return
          }

          this.handleChange(keyword)
        }
      }
    })

    const searchResultList = new SearchResultList({
      node: selectEl(this.node, 'SearchResultList'),
      initalState: {
        listData,
        listVisible,
        currentKeywordId
      }
    })

    this.subscribe(searchResultList)
  }

  setEvent(): void {
    window.addEventListener('keyup', this.handleKeyup)
  }

  clearEvent(): void {
    window.removeEventListener('keyup', this.handleKeyup)
  }
}
