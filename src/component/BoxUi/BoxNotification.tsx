import { useQuery } from '@tanstack/react-query'
import React from 'react'
import NotificationService from '../../apis/notification.service'
import NotificationProduct from '../Header/Components/NotificationProduct'
import NotificationShop from '../Header/NotificationShop'
import { useLocation } from 'react-router-dom'
import NotificationSystem from '../Header/Components/NotificationSystem'

const BoxNotification = () => {
      const getMyNotification = useQuery({
            queryKey: ['/v1/api/notification/get-my-notification'],
            queryFn: () => NotificationService.getMyNotification(),
      })

      const location = useLocation().hash.slice(1)

      const styleEffect = {
            activeHash: (notification: string) => (notification === location ? 'bg-blue-100' : ''),
      }

      return (
            <div className='relative w-full  pb-[10px] h-[1000px] flex flex-col '>
                  <div className='sticky top-[-1px] left-[0px]  w-full min-h-[80px] py-[4px] bg-[#ffffff] shadow-lg flex items-center justify-center text-[16px] font-extrabold'>
                        Thông báo của tôi
                  </div>
                  {getMyNotification.isSuccess &&
                        getMyNotification.data?.data.metadata.notifications &&
                        getMyNotification.data.data.metadata.notifications.notifications_message.map((notification) => {
                              return (
                                    <div
                                          className='flex flex-col min-h-[360px]  h-max w-full  my-[18px] bg-[#ffffff]'
                                          key={notification._id}
                                    >
                                          <div
                                                style={{ direction: 'ltr' }}
                                                className='flex justify-between w-full h-full flex-col gap-[24px] '
                                          >
                                                {notification.notification_attribute.notification_type === 'SYSTEM' && (
                                                      <div
                                                            id={notification._id}
                                                            className={`${styleEffect.activeHash(
                                                                  notification._id,
                                                            )} min-h-full h-max p-[12px_10px]`}
                                                      >
                                                            <NotificationSystem
                                                                  // orderProductId={notification.notification_attribute.order_id}
                                                                  notification={notification}
                                                            />
                                                      </div>
                                                )}

                                                {notification.notification_attribute.notification_type === 'PRODUCT' && (
                                                      <div
                                                            id={notification._id}
                                                            className={`${styleEffect.activeHash(
                                                                  notification._id,
                                                            )} min-h-full m-max  p-[12px_10px]`}
                                                      >
                                                            <NotificationProduct
                                                                  key={notification.notification_attribute.product_id}
                                                                  notificationProduct={notification.notification_attribute}
                                                                  notification={notification}
                                                            />
                                                      </div>
                                                )}

                                                {notification.notification_attribute.notification_type === 'SHOP' && (
                                                      <div
                                                            id={notification?._id}
                                                            className={`${styleEffect.activeHash(notification?._id)}  p-[12px_10px]`}
                                                      >
                                                            {/* <span>{notification.notification_attribute.order_id}</span> */}
                                                            <NotificationShop
                                                                  orderProductId={notification.notification_attribute.order_id}
                                                                  notification={notification}
                                                            />
                                                      </div>
                                                )}
                                          </div>
                                    </div>
                              )
                        })}
            </div>
      )
}

export default BoxNotification
