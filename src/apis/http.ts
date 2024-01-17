import axios, { type AxiosInstance } from 'axios'
import Auth from './auth.api'

let retry = false
class AxiosCustom {
      instance: AxiosInstance

      constructor() {
            console.log(process.env.REACT_APP_BASE_URL)
            this.instance = axios.create({
                  baseURL: process.env.REACT_APP_BASE_URL,
                  timeout: 1000,
                  headers: {
                        'Content-Type': 'application/json',
                  },
            })

            //request

            this.instance.interceptors.request.use(
                  (config) => {
                        const access_token = JSON.parse(localStorage.getItem('token') as string) || null
                        const user = JSON.parse(localStorage.getItem('user') as string)
                        config.headers['Authorization'] = `Bearer ${access_token} `
                        config.headers['x-client-id'] = user?._id || null
                        return config
                  },
                  (error) => Promise.reject(error),
            )

            //response
            this.instance.interceptors.response.use(
                  (res) => res,
                  async (error) => {
                        const originalRequest = error.config

                        if (error.response?.status !== 401) return Promise.reject(error)
                        if (
                              error.response?.status === 401 &&
                              error.response?.statusText === 'Unauthorized' &&
                              error.response?.data.detail === 'Token expires' &&
                              !retry
                        ) {
                              retry = true

                              const res = await Auth.refresh_token()
                              console.log(res)
                              if (res) {
                                    const { token } = res.data.metadata
                                    error.config.headers['Authorization'] = `Bearer ${token}`
                                    localStorage.setItem('token', JSON.stringify(token))
                                    return this.instance.request(error.config)
                              }
                              return Promise.reject(res)
                        }
                  },
            )
      }
}

const axiosCustom = new AxiosCustom().instance

export default axiosCustom
