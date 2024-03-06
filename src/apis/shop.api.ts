import { ModeForm } from '../component/BoxUi/BoxShopForm'
import { TResponseApi } from '../types/axiosResponse'
import { ProductType, TProductFull } from '../types/product/product.type'
import { ShopResponse } from '../types/shop.type'
import { UserResponse } from '../types/user.type'
import axiosCustom from './http'

export type StateFile = 'Full' | 'no-file'

type ImageCloudinary = {
      secure_url: string
      public_id: string
}

export type TShopAvatarReturn = {
      shop_id: string
      shop_avatar: ImageCloudinary
}

export interface IUploadImageAvatar extends FormData {
      append(name: 'image', value: string | Blob, fileName?: string): void
}

export interface IPublicIdImage extends FormData {
      append(name: 'public_id', value: string | Blob, fileName?: string): void
}

export interface RegisterShop extends FormData {
      append(name: 'file' | 'shop_name', value: string | Blob, fileName?: string): void
}

class ShopApi {
      static async registerShop(data: RegisterShop, state: StateFile, mode: ModeForm) {
            return axiosCustom.post<{ metadata: { shop: ShopResponse; user: UserResponse } }>(
                  `v1/api/shop/register-shop?state=${state}&mode=${mode}`,

                  data,
                  {
                        headers: { 'content-Type': 'multipart/form-data' },
                  },
            )
      }

      static async uploadAvatar(formData: IUploadImageAvatar) {
            return axiosCustom.post<{ metadata: TShopAvatarReturn }>('v1/api/shop/upload-avatar-shop', formData, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async deleteAvatar({ shop_id, public_id }: { shop_id: string; public_id: string }) {
            return axiosCustom.post<{ metadata: TShopAvatarReturn }>(`v1/api/shop/delete-avatar-shop`, { shop_id, public_id })
      }

      static async getShopName() {
            return axiosCustom.get<any>(`v1/api/shop/get-shop-name`)
      }

      static async getMyShop() {
            return axiosCustom.get<{ metadata: { shop: ShopResponse } }>('v1/api/shop/get-my-shop')
      }

      static async getProductMyShop() {
            return axiosCustom.get<{ metadata: { myProductOfShop: TProductFull[] } }>('v1/api/shop/get-product-my-shop')
      }

      static async foundShopHasProductType({ product_type }: { product_type: ProductType }) {
            return axiosCustom.get<TResponseApi<{ shops: ShopResponse[] }>>(
                  `/v1/api/shop/get-shop-has-product?product_type=${product_type}`,
            )
      }
}

export default ShopApi
