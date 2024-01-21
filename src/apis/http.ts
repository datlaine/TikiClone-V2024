import axios, { AxiosError, type AxiosInstance } from 'axios'
import Auth from './auth.api'
import TErrorAxios from '../types/axios.response.error'

let retry = false
class AxiosCustom {
      instance: AxiosInstance

      constructor() {
            console.log(process.env.REACT_APP_BASE_URL)
            this.instance = axios.create({
                  baseURL: process.env.REACT_APP_BASE_URL,
                  timeout: 10000,
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
                        console.log({ error })
                        const originalRequest = error.config
                        // if (error.response?.status !== 401 || error.response?.status !== 403) return Promise.reject(error)
                        if (
                              error.response?.status === 401 &&
                              error.response?.statusText === 'Unauthorized' &&
                              error.response.config.url === '/v1/api/auth/rf'
                        ) {
                              localStorage.removeItem('user')
                              localStorage.removeItem('token')
                              return Promise.reject(error)
                        }
                        if (
                              error.response?.status === 401 &&
                              error.response?.statusText === 'Unauthorized' &&
                              error.response?.data?.detail === 'Token expires' &&
                              !originalRequest.retry
                        ) {
                              originalRequest.retry = true

                              const res = await Auth.refresh_token()

                              if (res) {
                                    const { token } = res.data.metadata
                                    if (error.response.config.url === 'v1/api/account/update-avatar') {
                                          console.log('dung url ne')
                                          error.config.headers['Content-Type'] = 'multipart/form-data'
                                    }
                                    error.config.headers['Authorization'] = `Bearer ${token}`
                                    localStorage.setItem('token', JSON.stringify(token))
                                    originalRequest.retry = false
                                    return this.instance(error.config)
                              }
                              if (!res) {
                                    return Promise.reject(res)
                              }

                              console.log('sdsd', res)
                        }

                        if (
                              error.response?.status === 403 &&
                              error.response?.statusText === 'Forbidden' &&
                              error.response?.data.detail === 'Refresh-token is invalid'
                        ) {
                              return Promise.reject(error)
                        }
                        return Promise.reject(error)
                  },
            )
      }
}

const axiosCustom = new AxiosCustom().instance

export default axiosCustom
