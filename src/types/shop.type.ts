import { TImageCLoudinary } from './cloudinary.type'

export type TShop = {
      owner: string
      shop_name: string
      shop_avatar: TImageCLoudinary
      shop_avatar_used: TImageCLoudinary[]
      shop_avartar_default: string
      create_at: Date
}
