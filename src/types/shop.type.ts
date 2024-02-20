import { TImageCLoudinary } from './cloudinary.type'

export type TShop = {
      _id: string
      owner: string
      shop_name: string
      shop_avatar: TImageCLoudinary
      shop_avatar_used: TImageCLoudinary[]
      shop_avatar_default: string
      create_at: Date
}
