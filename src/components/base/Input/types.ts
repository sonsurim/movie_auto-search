interface IInput {
  placeholder?: string
  onChange(e: any): void
  onFocus(): void
  onBlur(): void
}

export type { IInput }
