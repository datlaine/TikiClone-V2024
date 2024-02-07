import { TFormRegisterShop } from '../Customer/Shop/RegisterShop'
import { TUser } from '../types/axiosResponse'
import axiosCustom from './http'

type ImageCloudinary = {
    secure_url: string
    public_id: string
}

type ImageCloudinaryPublicId = {
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

export type TShop = {
    _id: string
    owner: string
    __v: number
    createdAt: string
    shop_avartar_default: string
    shop_avatar_used: ImageCloudinary[]
    shop_name: string
    updatedAt: string
}

class ShopApi {
    static async registerShop(data: TFormRegisterShop) {
        return axiosCustom.post<{ metadata: { shop: TShop; user: TUser } }>('v1/api/shop/register-shop', { shop_name: data.shop_name })
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
}

export default ShopApi