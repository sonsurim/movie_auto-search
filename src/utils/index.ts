import type { ICreateEl, ISelectEl, ISelectAllEl } from './types'

const createEl: ICreateEl = (tagName, attribute, options) => {
  const newEl = document.createElement(tagName)

  if (options?.length > 0) {
    newEl.setAttribute(attribute, options.join(' '))
  }

  return newEl
}

const selectEl: ISelectEl = (target, selector) => {
  return target.querySelector(selector)
}

const selectAllEl: ISelectAllEl = (target, selector) => {
  return target.querySelectorAll(selector)
}

function convertTemplateAsComponent(): void {
  const oldNode = this.node
  const componentChildren = Array.from(
    new DOMParser().parseFromString(this.template(), 'text/html').body.children
  )
  const component = new DocumentFragment()
  component.append(...componentChildren)

  oldNode.after(component)
  this.node = oldNode.nextSibling

  // CSS 상속
  const oldCSS = oldNode.classList.value.trim()
  const newCSS = this.node.classList.value.trim()
  const isChangedCSS = oldCSS !== newCSS
  const cssValue = isChangedCSS ? newCSS || oldCSS : oldCSS
  this.node.className = cssValue

  oldNode.remove()
}

export { createEl, selectEl, selectAllEl, convertTemplateAsComponent }
