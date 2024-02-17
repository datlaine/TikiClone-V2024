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

      static async changeQuantityProductWithButton(data: { isIncrease: boolean }) {
            return axiosCustom.post<{ metadata: { quantity: number } }>('v1/api/cart/cart-update-quantity-btn', data)
      }

      static async changeQuantityProductWithInput() {
            return axiosCustom.post<{ metadata: { quantity: number } }>('v1/api/cart/cart-update-quantity-input')
      }

      static async changeQuantityProductCart(data: TModeChangeQuantityProductCart) {
            return axiosCustom.post<{ metadata: { quantity: number } }>('v1/api/cart/cart-change-quantity', data)
      }
}

export default CartService
