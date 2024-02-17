import axios, { AxiosError, type AxiosInstance } from 'axios'
import Auth from './auth.api'
import TErrorAxios from '../types/axios.response.error'
import { store } from '../store'
import { addToast } from '../Redux/toast'

let retry = false
class AxiosCustom {
      instance: AxiosInstance
      refreshTokenPromise: any // this holds any in-progress token refresh requests

      constructor() {
            console.log(process.env.REACT_APP_BASE_UR_LOCALL)
            this.instance = axios.create({
                  baseURL: process.env.REACT_APP_BASE_URL_LOCAL,
                  timeout: 10000,
                  headers: {
                        'Content-Type': 'application/json',
                  },
            })

            //request

            this.instance.interceptors.request.use(
                  (config) => {
                        const access_token = JSON.parse(localStorage.getItem('token') as string) || '123'
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
                        // console.log({ error })
                        const originalRequest = error.config
                        // if (error.response?.status !== 401 || error.response?.status !== 403) return Promise.reject(error)

                        if (
                              error.response?.status === 401 &&
                              error.response?.statusText === 'Unauthorized' &&
                              error.response?.data?.detail === 'Token hết hạn' &&
                              !originalRequest.retry
                        ) {
                              originalRequest.retry = true
                              store.dispatch(addToast({ type: 'ERROR', message: 'Token hết hạn', id: Math.random().toString() }))
                              this.refreshTokenPromise = this.refreshTokenPromise
                                    ? this.refreshTokenPromise
                                    : Auth.refresh_token().finally(() => (this.refreshTokenPromise = null))
                              return this.refreshTokenPromise.then(
                                    (data: any) => {
                                          // console.log({ data })
                                          const { token } = data.data.metadata

                                          if (!token) return Promise.reject(token)
                                          store.dispatch(
                                                addToast({
                                                      type: 'WARNNING',
                                                      message: 'Lấy thành công đang tiến hàng call lại api',
                                                      id: Math.random().toString(),
                                                }),
                                          )
                                          if (
                                                error.response.config.url === 'v1/api/account/update-avatar' ||
                                                error.response.config.url === 'v1/api/product/upload-product-thumb' ||
                                                error.response.config.url === 'v1/api/product/upload-product-images-full' ||
                                                error.response.config.url === 'v1/api/product/update-product-thumb' ||
                                                error.response.config.url === 'v1/api/product/update-product-images-full' ||
                                                error.response.config.url === 'v1/api/shop/upload-avatar-shop' ||
                                                error.response.config.url === 'v1/api/product/upload-product-description-image-one' ||
                                                error.response.config.url === 'v1/api/product/delete-product-description-image-one'
                                          ) {
                                                console.log('dung url ne')
                                                error.config.headers['Content-Type'] = 'multipart/form-data'
                                                error.config.timeout = 20000
                                          }
                                          error.config.headers['Authorization'] = `Bearer ${token}`
                                          localStorage.setItem('token', JSON.stringify(token))
                                          originalRequest.retry = false
                                          return this.instance(error.response.config)
                                    },
                                    // if (!this.refreshTokenPromise) {
                                    //     return Promise.reject(this.refreshTokenPromise)
                                    // }
                              )
                        }

                        if (
                              error.response?.status === 403 &&
                              error.response?.statusText === 'Forbidden' &&
                              error.response?.data.detail === 'Token không đúng' &&
                              error.response.config.url === '/v1/api/auth/rf'
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
