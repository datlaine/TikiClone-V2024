import { useQuery } from '@tanstack/react-query'
import React from 'react'
import NotificationService from '../../apis/notification.service'

const BoxNotification = () => {
      const getMyNotification = useQuery({
            queryKey: ['/v1/api/notification/get-my-notification'],
            queryFn: () => NotificationService.getMyNotification(),
      })

      return (
            <div>
                  {getMyNotification.data?.data.metadata.notifications.notifications_message.map((notification) => (
                        <div>
                              <span>{notification.notification_type}</span>
                        </div>
                  ))}
            </div>
      )
}

export default BoxNotification
