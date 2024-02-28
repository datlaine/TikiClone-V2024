import { useQuery } from '@tanstack/react-query'
import React from 'react'
import NotificationService from '../../apis/notification.service'
import NotificationProduct from '../Header/Components/NotificationProduct'
import NotificationShop from '../Header/NotificationShop'

const BoxNotification = () => {
      const getMyNotification = useQuery({
            queryKey: ['/v1/api/notification/get-my-notification'],
            queryFn: () => NotificationService.getMyNotification(),
      })

      return (
            <div className='relative w-full  pb-[10px] h-[1000px] flex flex-col '>
                  <p className='sticky top-[-1px] left-[0px]  w-full h-[30px] py-[4px] bg-[#f5f4f6] flex items-center justify-center text-[16px] font-extrabold'>
                        Thông báo của tôi
                  </p>
                  {getMyNotification.isSuccess &&
                        getMyNotification.data?.data.metadata.notifications &&
                        getMyNotification.data.data.metadata.notifications.notifications_message.map((notification) => {
                              return (
                                    <div
                                          className='flex flex-col min-h-[360px] xl:min-h-[120px] h-max w-full px-[12px] my-[18px]'
                                          key={notification._id}
                                    >
                                          <div
                                                style={{ direction: 'ltr' }}
                                                className='flex justify-between w-full h-full flex-col gap-[24px]'
                                          >
                                                {notification.notification_attribute.notification_type === 'PRODUCT' && (
                                                      <NotificationProduct
                                                            key={notification.notification_attribute.product_id}
                                                            notificationProduct={notification.notification_attribute}
                                                            notification={notification}
                                                      />
                                                )}

                                                {notification.notification_attribute.notification_type === 'SHOP' && (
                                                      <NotificationShop
                                                            orderProductId={notification.notification_attribute.order_product_id}
                                                            notification={notification}

                                                            // key={notification.notification_attribute.product_id}
                                                            // notificationProduct={notification.notification_attribute}
                                                            // notification={notification}
                                                      />
                                                )}
                                                {/* {notification.notification_attribute.notification_type === 'SHOP' && (
                                                                        <span>Shop nè</span>
                                                                  )} */}
                                          </div>
                                          {/* <div className=''>
                                                            <p>{notification.notification_attribute.notification_content}</p>
                                                      </div> */}
                                    </div>
                              )
                        })}
            </div>
      )
}

export default BoxNotification
