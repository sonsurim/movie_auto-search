type IDebounce = (
  callback: (event?: any) => void,
  delay: number
) => (event: any) => void

export type { IDebounce }
