import http from './http'

export const fetchData = (url: string) => {
      const urlApi = `${process.env.REACT_APP_BASE_URL_SERVER}${url}`
      return http.get<string[]>(urlApi)
}
