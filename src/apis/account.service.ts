import { AddressForm } from '../forms/FormAddress'
import { TResponseApi } from '../types/axiosResponse'
import { UserAddress, UserAvatarUsed, UserResponse } from '../types/user.type'
import axiosCustom from './http'

class AccountService {
      static async getMe() {
            return axiosCustom.post<TResponseApi<{ user: UserResponse }>>('/v1/api/account/getMe')
      }

      static async updateInfo(data: any) {
            return axiosCustom.post('/v1/api/account/update-info', data)
      }

      static async updateAvatar(data: any) {
            return axiosCustom.post('v1/api/account/update-avatar', data, { headers: { 'content-Type': 'multipart/form-data' } })
      }

      static async getAllAvatar() {
            return axiosCustom.get<TResponseApi<{ avatar_used: UserAvatarUsed[] }>>('v1/api/account/getAllAvatar')
      }

      static async deleteAvatarUsed(public_id: string) {
            return axiosCustom.post<TResponseApi<{ user: UserResponse }>>('v1/api/account/deleteAvatarUsed', { public_id })
      }

      static async deleteAvatar() {
            return axiosCustom.post<TResponseApi<{ user: UserResponse }>>('v1/api/account/deleteAvatar')
      }

      static async addAddress({ form }: { form: AddressForm }) {
            return axiosCustom.post<TResponseApi<{ user: UserResponse }>>('v1/api/account/add-address', { addressPayload: form })
      }

      static async setAddressDefault(form: Pick<UserAddress, '_id'>) {
            return axiosCustom.post<TResponseApi<{ user: UserResponse }>>('v1/api/account/set-address-default', { addressPayload: form })
      }

      static async deleteAddress({ address_id }: { address_id: string }) {
            return axiosCustom.delete<TResponseApi<{ user: UserResponse }>>(`v1/api/account/delete-address/${address_id}`)
      }
}

export default AccountService
