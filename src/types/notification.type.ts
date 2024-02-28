export type Notification = {
      notification_count: number
      notifications_message: [NotificationMessage]
}

export type NotificationMessage = {
      notification_attribute: NotificationAttribute
      notification_creation_time: Date
      _id: string
}

interface NotificationSystem {
      notification_type: 'SYSTEM'
      notification_content: string
}

export type NotificationProduct = {
      notification_type: 'PRODUCT'
      product_id: string
      notification_content: string
}

export type NotificationShop = {
      notification_type: 'SHOP'
      notification_content: string
      order_id: string
      order_product_id: string
      user_buy_id: string
}

export type NotificationAdmin = {
      notification_type: 'ADMIN'
      notification_content: string
      notification_sender: string
}

export type NotificationAttribute = NotificationSystem | NotificationProduct | NotificationAdmin | NotificationShop
