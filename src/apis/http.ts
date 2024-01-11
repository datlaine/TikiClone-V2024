import axios, { type AxiosInstance } from 'axios'

class Http {
      instance: AxiosInstance

      constructor() {
            this.instance = axios.create({
                  baseURL: process.env.BASE_URL_SERVER,
                  timeout: 1000,
                  headers: {
                        'Content-Type': 'application/json',
                  },
            })

            console.log('BASE_URL_SERVER::', process.env.REACT_APP_BASE_URL_SERVER)
            // this.instance.interceptors.request.use(
            //       (config) => {
            //             // alert('run')
            //             return config
            //       },
            //       (error) => console.log('error::', error),
            // )

            // this.instance.interceptors.response.use(
            //       (response) => response,
            //       (config) => config,
            // )
      }
}

export const http = new Http().instance
