import axiosCustom from './http'

type TAuthParams = {
      email: string
      password: string
}

class Auth {
      static async login({ email, password }: TAuthParams) {
            return axiosCustom.post('/v1/api/auth/login', { email, password }, { withCredentials: true })
      }

      static async register({ email, password }: TAuthParams) {
            console.log(process.env.REACT_APP_BASE_URL)

            return axiosCustom.post('/v1/api/auth/register', { email, password }, { withCredentials: true })
      }

      static async logout() {
            return axiosCustom.post('/v1/api/auth/logout', {})
      }

      static async refresh_token() {
            return axiosCustom.post<{ metadata: { token: string } }>('/v1/api/auth/rf', {}, { withCredentials: true })
      }
}

export default Auth
