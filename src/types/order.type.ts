import { CartProduct } from './cart.type'

export type Order = {
      order_time: Date
      order_products: OrderItem[]
}

export type OrderItem = {
      _id: string
      products: CartProduct[]
      order_time_payment: Date
      order_total: number
}

export type OrderNested = {}
