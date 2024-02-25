import { ParamOrderAdd } from '../pages/payment/PaymentCart'
import axiosCustom from './http'

class OrderService {
      static async orderAddProduct(products: ParamOrderAdd) {
            return axiosCustom.post('/v1/api/order/order-payment-product', { products })
      }
}

export default OrderService
