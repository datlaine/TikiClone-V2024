import { DateTime } from 'luxon'
import { Cart, CartForm, CartFormData } from '../types/cart.type'
import axiosCustom from './http'
import { DateTimeFromString } from '../utils/datetime.util'

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
}

export default CartService
