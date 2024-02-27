export type Notification = {
      notification_count: number
      notifications_message: [NotificationMessage]
}

export type NotificationMessage = {
      notification_type: NotificationType
      notification_attribute: NotificationAttribute
      notification_creation_time: Date
}

type NotificationType = 'System' | 'Admin' | 'Product'

interface NotificationSystem {
      notification_content: string
}

interface NotificationCommon extends NotificationSystem {
      notification_sender: string
}

type NotificationProduct = NotificationCommon
type NotificationAdmin = NotificationCommon
type NotificationAttribute = NotificationSystem | NotificationProduct | NotificationAdmin
