import { API_REQUEST } from '@constants'
import type { IRequest } from './types'

const { BASE_URL } = API_REQUEST

export const request: IRequest = async url => {
  try {
    const res = await fetch(`${BASE_URL}${url}`)

    if (!res.ok) {
      throw new Error('API 응답 상태가 이상합니다!')
    }

    return res.json()
  } catch (e) {
    console.error(e.message)
  }
}
