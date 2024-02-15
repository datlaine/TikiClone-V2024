import { TResponseApi, TUser, TUserAvatarUsed } from '../types/axiosResponse'
import axiosCustom from './http'

class Account {
      static async getMe() {
            return axiosCustom.post<TResponseApi<{ user: TUser }>>('/v1/api/account/getMe')
      }

      static async updateInfo(data: any) {
            return axiosCustom.post('/v1/api/account/update-info', data)
      }

      static async updateAvatar(data: any) {
            return axiosCustom.post('v1/api/account/update-avatar', data, { headers: { 'content-Type': 'multipart/form-data' } })
      }

      static async getAllAvatar() {
            return axiosCustom.get<TResponseApi<{ avatar_used: TUserAvatarUsed[] }>>('v1/api/account/getAllAvatar')
      }

      static async deleteAvatarUsed(public_id: string) {
            return axiosCustom.post<TResponseApi<{ user: TUser }>>('v1/api/account/deleteAvatarUsed', { public_id })
      }

      static async deleteAvatar() {
            return axiosCustom.post<TResponseApi<{ user: TUser }>>('v1/api/account/deleteAvatar')
      }
}

export default Account
