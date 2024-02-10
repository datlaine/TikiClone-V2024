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
                console.log({ error })
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
                    if (!this.refreshTokenPromise) {
                        // check for an existing in-progress request
                        // if nothing is in-progress, start a new refresh token request
                        this.refreshTokenPromise = Auth.refresh_token().then((token) => {
                            this.refreshTokenPromise = null // clear state
                            return token // resolve with the new token
                        })
                    }
                    console.log({ http: this.refreshTokenPromise })
                    // const res = await Auth.refresh_token()
                    // console.log({ res })
                    return this.refreshTokenPromise.then(
                        (data: any) => {
                            console.log({ data })
                            const { token } = data.data.metadata
                            if (
                                error.response.config.url === 'v1/api/account/update-avatar' ||
                                error.response.config.url === 'v1/api/product/upload-product-thumb' ||
                                error.response.config.url === 'v1/api/product/upload-product-images-full' ||
                                error.response.config.url === 'v1/api/product/update-product-thumb' ||
                                error.response.config.url === 'v1/api/product/update-product-images-full' ||
                                error.response.config.url === 'v1/api/shop/upload-avatar-shop'
                            ) {
                                console.log('dung url ne')
                                error.config.headers['Content-Type'] = 'multipart/form-data'
                                error.config.timeout = 20000
                            }
                            error.config.headers['Authorization'] = `Bearer ${token}`
                            localStorage.setItem('token', JSON.stringify(token))
                            originalRequest.retry = false
                            return this.instance(error.config)
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
