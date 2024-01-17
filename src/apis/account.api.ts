import axiosCustom from './http'

class Account {
      static async getMe() {
            return axiosCustom.get('/v1/api/account/getMe')
      }

      static async updateInfo(data: any) {
            return axiosCustom.post('/v1/api/account/update-info', data)
      }
}

export default Account
