import { CartProduct } from './cart.type'

export type Order = {
      order_time: Date
      order_products: [
            {
                  products: CartProduct[]
                  order_time_payment: Date
            }[],
      ]
}

export type OrderNested = {}
