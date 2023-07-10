import { apiLink } from './api'
import { http } from './http'

export const getListProducts = (page) => {
  let limit = 4
  if (page === 1) {
    limit = 4
  } else {
    limit = 6
  }
  return http.get(`${apiLink}/danhSachSanPham?_page=${page}&_limit=${limit}`)
}
