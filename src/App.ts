import { Component } from '@components'

export default class App extends Component<null> {
  template(): string {
    return `
      <main id="#App">
        <div>App Component</div>
      </main>
    `
  }
}
