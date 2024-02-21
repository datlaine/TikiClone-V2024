import { TProductDetail } from './product/product.type'
import { ShopResponse } from './shop.type'

// export interface Cart {
//       _id: string
//       cart_user_id: string
//       cart_date: Date
//       cart_quantity: number
//       cart_product_price: number
//       cart_product_price_origin: number
//       cart_is_select: boolean
//       cart_product_id: Pick<TProductDetail, '_id' | 'product_thumb_image' | 'product_price' | 'product_name' | 'product_state'> & {
//             shop_id: Pick<TShop, '_id' | 'shop_name' | 'shop_avatar' | 'shop_avatar_default'>
//       }
// }

export interface CartForm {
      product_id: string
      quantity: number
      price: number
}

export interface CartFormData extends FormData {
      append(name: keyof CartForm, value: string | Blob, fileName?: string): void
}

export type CartProductRef = Pick<TProductDetail, '_id' | 'product_thumb_image' | 'product_price' | 'product_name' | 'product_state'>
export type CartShopRef = Pick<ShopResponse, '_id' | 'shop_name' | 'shop_avatar' | 'shop_avatar_used' | 'shop_avatar_default'>

export interface CartProduct {
      _id: string
      product_id: CartProductRef
      shop_id: CartShopRef
      cart_state: 'active' | 'pending' | 'complete'

      quantity: number
      new_quantity: number
      isSelect: boolean
      cart_date: Date
}

export type CartResponse = {
      _id: string
      shop_id: CartShopRef
      cart_products: CartProduct[]
      cart_state: 'active' | 'pending' | 'complete'
      cart_select_all: boolean
      quantity: number
      new_quantity: number
      isSelect: boolean
}
