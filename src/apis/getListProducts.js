import { apiLink } from './api'
import http from './http'

export const getListProducts = async (page) => {
    let limit = 28
    if (page === 1) {
        limit = 28
    } else {
        limit = 30
    }
    return await http.get(`${apiLink}/danhSachSanPham?_page=${page}&_limit=${limit}`)
}
