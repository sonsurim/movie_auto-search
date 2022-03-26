import { request } from '@api'
import { getItem, setItem } from '@utils'

type IStorageItem = {
  [key in string]: object
}

export const getMovieList = async (keyword: string): Promise<any> => {
  const storagedList = getItem('movieList', {}) as IStorageItem

  if (storagedList && storagedList[keyword]) {
    return storagedList[keyword]
  }

  const res = await request(`/autocomplete?value=${keyword}`)

  setItem('movieList', {
    ...storagedList,
    [keyword]: res
  })

  return res
}
