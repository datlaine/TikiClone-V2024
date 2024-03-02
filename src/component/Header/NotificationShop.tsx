import { useQuery } from '@tanstack/react-query'
import React from 'react'
import NotificationService from '../../apis/notification.service'
import { renderStringNotificationType } from '../../utils/notification.utit'
import { NotificationAttribute, NotificationMessage } from '../../types/notification.type'
import { Link } from 'react-router-dom'
import { convertDateToStringFull } from '../../utils/date.utils'
import NotificationSkeleton from '../../Customer/Notification/NotificationSkeleton'
import { ArrowBigUp } from 'lucide-react'

type TProps = {
      orderProductId: string
      notification: NotificationMessage
}

const NotificationShop = (props: TProps) => {
      const { orderProductId, notification } = props

      console.log('shop')

      const getMyShopNotification = useQuery({
            queryKey: ['v1/api/notification/get-my-shop-notifications', orderProductId],
            queryFn: () => NotificationService.getMyShopNotification({ order_product_id: orderProductId }),
      })

      console.log({ notification: notification._id, orderProductId })

      return (
            <section className='w-full h-full flex flex-col gap-[12px]'>
                  <header className='w-full flex justify-between text-[12px]'>
                        <p className='flex-1 flex flex-col xl:flex-row gap-[4px] items-center'>
                              <span>
                                    {renderStringNotificationType({
                                          notification_type: notification.notification_attribute as NotificationAttribute,
                                    })}
                              </span>
                              <span>{notification.notification_attribute.notification_content}</span>
                              <ArrowBigUp strokeWidth={1.75} color='red' />
                        </p>
                        {/* <p>{notification._id}</p> */}
                  </header>
                  {getMyShopNotification.isSuccess &&
                        getMyShopNotification.data.data.metadata.myNotificationShop.product_sell &&
                        getMyShopNotification.data.data.metadata.myNotificationShop.product_sell!.map((p) => {
                              return (
                                    <div className='flex-1' key={p._id}>
                                          {
                                                <div className='flex flex-col xl:flex-row gap-[6px]'>
                                                      <Link
                                                            to={`/customer/notification#${notification._id}`}
                                                            className='w-full xl:w-[100px] h-[120px] xl:h-[100px]'
                                                      >
                                                            <img
                                                                  src={p.product_doc.product_thumb_image.secure_url}
                                                                  className='w-full  min-h-full h-full'
                                                                  alt='product'
                                                            />
                                                      </Link>
                                                      <div className='flex flex-col gap-[4px] justify-between'>
                                                            <div className=''>
                                                                  <span>{p.product_doc.product_name}</span>
                                                            </div>
                                                            <div className='flex gap-[16px]'>
                                                                  <span>Số lượng: {p.product.quantity}</span>

                                                                  <span>Giá {p.product.quantity * p.product_doc.product_price}</span>
                                                            </div>
                                                            {/* <div className='flex gap-[6px]'>
                                                                  <span>Shop:</span>
                                                                  <div className='flex gap-[4px] items-center'>
                                                                        <img
                                                                              src={
                                                                                    p.product_doc.shop_id.shop_avatar?.secure_url ||
                                                                                    p.product_doc.shop_id.shop_avatar_default
                                                                              }
                                                                              className='w-[12px] h-[12px] rounded-full'
                                                                              alt=''
                                                                        />
                                                                        <span>{p.product_doc.shop_id.shop_name}</span>
                                                                  </div>
                                                            </div> */}
                                                            <p className='flex flex-col xl:flex-row xl:gap-[4px]'>
                                                                  <span>Thời gian mua: {'  '}</span>
                                                                  <span>
                                                                        {convertDateToStringFull(notification.notification_creation_time)}
                                                                  </span>
                                                            </p>
                                                      </div>
                                                </div>
                                          }
                                    </div>
                              )
                        })}

                  {getMyShopNotification.isSuccess && !getMyShopNotification.data.data.metadata.myNotificationShop.product_sell && (
                        <div>Không tìm thấy dữ liệu</div>
                  )}
                  {getMyShopNotification.isPending && <NotificationSkeleton />}
            </section>
      )
}

export default NotificationShop
