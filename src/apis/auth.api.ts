import axiosCustom from './http'

type TAuthParams = {
      email: string
      password: string
}

class Auth {
      static async login({ email, password }: TAuthParams) {
            return axiosCustom.post('/api/v1/auth/login', { email, password }, { withCredentials: true })
      }

      static async register({ email, password }: TAuthParams) {
            return axiosCustom.post('/api/v1/auth/register', { email, password })
      }

      static async logout() {
            return axiosCustom.post('/api/v1/auth/logout', {})
      }

      static async refresh_token() {
            return axiosCustom.get('/api/v1/auth/refresh-token', { withCredentials: true })
      }
}

export default Auth
