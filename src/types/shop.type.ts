import { TCloudinaryImage } from '../Customer/Sell/types/cloudinary.typs'

export type ShopResponse = {
      _id: string
      owner: string
      __v: number
      createdAt: string
      shop_avatar: TCloudinaryImage
      shop_avatar_default: string
      shop_avatar_used: TCloudinaryImage[]
      shop_name: string
      updatedAt: string
}
