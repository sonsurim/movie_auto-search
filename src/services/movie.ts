import { request } from '@api'

export const getMovieList = async (keyword: string): Promise<any> => {
  const res = await request(`/autocomplete?value=${keyword}`)
  return res
}
