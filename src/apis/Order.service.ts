import { ParamOrderAdd } from '../pages/payment/PaymentCart'
import { TResponseApi } from '../types/axiosResponse'
import { Order } from '../types/order.type'
import axiosCustom from './http'

class OrderService {
      static async orderAddProduct(products: ParamOrderAdd) {
            return axiosCustom.post('/v1/api/order/order-payment-product', { products })
      }

      static async getMyOrder() {
            return axiosCustom.get<TResponseApi<{ order: Order }>>('/v1/api/order/get-my-order')
      }
}

export default OrderService
