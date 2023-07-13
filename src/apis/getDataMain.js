import { apiLink } from './api'
import { http } from './http'

export const getData = (namePath) => {
  return http.get(`${apiLink}${namePath}`)
}
