import { TProductDetail } from './product/product.type'

export interface Cart {
      _id: string
      cart_user_id: string
      cart_date: Date
      cart_quantity: number
      cart_product_price: number
      cart_product_price_origin: number

      cart_product_id: Pick<TProductDetail, '_id' | 'product_thumb_image' | 'product_price' | 'product_name'>
}

export interface CartForm {
      product_id: string
      quantity: number
      price: number
}

export interface CartFormData extends FormData {
      append(name: keyof CartForm, value: string | Blob, fileName?: string): void
}

// export interface Cart {
//       _id: string
//       product: TProductDetail
// }
