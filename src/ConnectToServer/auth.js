import http from "./http"


export const authLogin = (body) => {
  return http.post('/login', body, {withCredentials: true})
}
