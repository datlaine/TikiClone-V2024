import { TResponseApi } from '../types/axiosResponse'
import { CartProduct } from '../types/cart.type'
import { Notification } from '../types/notification.type'
import { OrderItem } from '../types/order.type'
import { TProductDetail } from '../types/product/product.type'
import axiosCustom from './http'

class NotificationService {
      static async getMyNotification() {
            return axiosCustom.get<TResponseApi<{ notifications: Notification }>>('/v1/api/notification/get-my-notification')
      }

      static async getMyShopNotification({ order_product_id }: { order_product_id: string }) {
            return axiosCustom.get<
                  TResponseApi<{
                        myNotificationShop: { product_sell: { product: CartProduct; _id: string; product_doc: TProductDetail }[] }
                  }>
            >(`/v1/api/notification/get-my-shop-notifications/${order_product_id}`)
      }
}

export default NotificationService
