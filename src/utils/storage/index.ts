const STORAGE = sessionStorage

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const res = STORAGE.getItem(key)

    if (!res) {
      throw new Error('없는 아이템')
    }

    return JSON.parse(res)
  } catch (e) {
    return defaultValue
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    STORAGE.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('storage 저장 중 문제가 발생하였습니다!')
  }
}

export { getItem, setItem }
