import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import NotificationService, { NotificationType } from '../../apis/notification.service'
import { limitNotification } from '../../constant/notification.constant'
import { convertDateToString, convertDateToStringFull } from '../../utils/date.utils'
import { Inbox } from 'lucide-react'
import BoxButton from '../../component/BoxUi/BoxButton'

type TProps = {
      type: NotificationType
}

const NotificationProduct = (props: TProps) => {
      const { type } = props

      console.log({ type })

      const getMyNotification = useInfiniteQuery({
            queryKey: ['/v1/api/notification/get-my-notification', type],
            queryFn: ({ pageParam = 1 }) => NotificationService.getMyNotification({ page: pageParam, type, limit: limitNotification }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
                  lastPage.data.metadata.notifications.notification.notifications_message.length > 0 ? allPages.length + 1 : undefined,
      })

      return (
            <div className='w-full min-h- h-max bg-[#ffffff] relative pb-[20px]'>
                  <div className='px-[28px] mb-[40px]'>
                        {getMyNotification.data?.pages.map((page) =>
                              page.data.metadata.notifications.notification.notifications_message.map((notification) => (
                                    <div className='w-full h-[100px] flex items-center  px-[4px] gap-[16px]' key={notification._id}>
                                          <div className='flex basis-[28%] h-[70%] items-center justify-between'>
                                                <p>{convertDateToStringFull(notification.notification_creation_time)}</p>
                                                <div className='w-[50px] h-[50px] flex items-center justify-center rounded-full'>
                                                      <Inbox size={30} color='white' />
                                                </div>
                                          </div>
                                          <div className='flex flex-1 items-center  h-full '>
                                                {notification.notification_attribute.notification_type === 'SYSTEM' && (
                                                      <span>{notification.notification_attribute.notification_content}</span>
                                                )}

                                                {notification.notification_attribute.notification_type === 'SHOP' && (
                                                      <span>{notification.notification_attribute.notification_content}</span>
                                                )}

                                                {notification.notification_attribute.notification_type === 'PRODUCT' && (
                                                      <p>
                                                            {notification.notification_attribute.notification_content}
                                                            <span>{notification.notification_attribute.product_name}</span>
                                                            <span>{notification.notification_attribute.product_quantity}</span>
                                                      </p>
                                                )}
                                          </div>
                                          <div className='basis-[20%] flex items-center justify-between bg-green-500'>
                                                <button className='min-w-[50%] w-max h-[30px] '>Đánh dấu là đã đọc</button>
                                                <button className='w-max h-[30px]'>Xóa</button>
                                          </div>
                                          {notification.notification_attribute.notification_type === 'SHOP' && (
                                                <span>{notification.notification_attribute.order_id}</span>
                                          )}
                                    </div>
                              )),
                        )}
                  </div>
                  <button
                        className='px-[32px] my-[40px] text-blue'
                        onClick={() => getMyNotification.fetchNextPage()}
                        disabled={!getMyNotification.hasNextPage || getMyNotification.isFetchingNextPage}
                  >
                        {!getMyNotification.hasNextPage ? 'Hết dữ liệu thông báo' : 'Tải thêm thông báo'}
                  </button>
            </div>
      )
}

export default NotificationProduct
