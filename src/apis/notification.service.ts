import { TResponseApi } from '../types/axiosResponse'
import { Notification } from '../types/notification.type'
import axiosCustom from './http'

class NotificationService {
      static async getMyNotification() {
            return axiosCustom.get<TResponseApi<{ notifications: Notification }>>('/v1/api/notification/get-my-notification')
      }
}

export default NotificationService
