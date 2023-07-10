import { apiLink } from './api'
import { http } from './http'

export const getProduct = (id) => {
  return http.get(`${apiLink}/danhSachSanPham?id=${id}`)
}
