import { TUser } from '../types/axiosResponse'
import { Cart, CartForm, CartFormData } from '../types/cart.type'
import axiosCustom from './http'

export type TModeChangeQuantityProductCart = {
      cart_id?: string
      mode: 'INCREASE' | 'DECREASE' | 'INPUT'
      quantity: number
}

class CartService {
      static async addCart({ cart }: { cart: CartFormData }) {
            return axiosCustom.post<{ metadata: Cart }>('v1/api/cart/add-cart', cart)
      }

      static async getCountProductCart() {
            return axiosCustom.get<{ metadata: { count: number } }>('v1/api/cart/cart-get-count-product')
      }

      static async getMyCart() {
            return axiosCustom.get<{ metadata: { cart: Cart[] } }>('v1/api/cart/cart-get-my-cart')
      }

      static async changeQuantityProductCart(data: TModeChangeQuantityProductCart) {
            return axiosCustom.post<{ metadata: { quantity: number } }>('v1/api/cart/cart-change-quantity', data)
      }

      static async selectAllCart(value: boolean) {
            return axiosCustom.post<{ metadata: { cart: Cart[]; user: TUser; current_select: boolean } }>(
                  '/v1/api/cart/cart-change-select-all',
                  { select: value },
            )
      }

      static async selectCartOne({ value, cart_id }: { value: boolean; cart_id: string }) {
            return axiosCustom.post<{ metadata: { cartUpdateItem: { cart_id: string; cart_is_select: boolean } } }>(
                  '/v1/api/cart/cart-change-select-one',
                  { value, cart_id },
            )
      }

      static async calculatorPrice() {
            return axiosCustom.get<{ metadata: { cart: Cart[] } }>('/v1/api/cart/cart-pay')
      }
}

export default CartService
