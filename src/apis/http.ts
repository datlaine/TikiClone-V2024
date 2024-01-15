import axios, { type AxiosInstance } from 'axios'
import Auth from './auth.api'

class AxiosCustom {
      instance: AxiosInstance

      constructor() {
            this.instance = axios.create({
                  baseURL: process.env.BASE_URL_SERVER,
                  timeout: 1000,
                  headers: {
                        'Content-Type': 'application/json',
                  },
            })

            //request

            this.instance.interceptors.request.use(
                  (config) => {
                        const access_token = JSON.parse(localStorage.getItem('token') as string) || undefined
                        const client_id = JSON.parse(localStorage.getItem('client_id') as string)
                        config.headers['Authorization'] = `Bearer ${access_token} `
                        config.headers['x-client-id'] = client_id
                        return config
                  },
                  (error) => Promise.reject(error),
            )

            //response
            this.instance.interceptors.response.use(
                  (res) => res,
                  async (error) => {
                        if (error.response?.status !== 401) return Promise.reject(error)
                        if (error.response?.status === 401 && error.response?.statusText === 'Invaild Token' && !error.config._retry) {
                              error.config._retry = true
                              const token = await Auth.refresh_token()
                              if (token) {
                                    error.config.headers['Authorization'] = `Bearer ${token}`
                                    localStorage.setItem('token', JSON.stringify(token))
                                    return this.instance.request(error.config)
                              }
                              return Promise.reject(token)
                        }
                  },
            )
      }
}

const axiosCustom = new AxiosCustom().instance

export default axiosCustom
