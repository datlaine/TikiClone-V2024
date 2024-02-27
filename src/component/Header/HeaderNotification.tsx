import { useQuery } from '@tanstack/react-query'
import { Bell } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import NotificationService from '../../apis/notification.service'
import { convertDateToStringFull } from '../../utils/date.utils'
import { useMatch } from 'react-router-dom'

const HeaderNotification = () => {
      const [showNotification, setShowNotification] = useState<boolean>(false)
      const match = useMatch('/')
      const boxNotificationRef = useRef<HTMLDivElement>(null)

      const getMyNotification = useQuery({
            queryKey: ['/v1/api/notification/get-my-notification'],
            queryFn: () => NotificationService.getMyNotification(),
      })

      const onControllShowNotification = () => {
            setShowNotification((prev) => !prev)
      }

      useEffect(() => {
            if (getMyNotification.isSuccess) {
                  console.log({ notification: getMyNotification.data.data.metadata.notifications })
            }
      }, [getMyNotification.isSuccess])

      useEffect(() => {
            if (!match) {
                  setShowNotification(false)
            }
      }, [match])

      useEffect(() => {
            const onClickGlobal = (e: MouseEvent) => {
                  console.log('run1')
                  if (boxNotificationRef.current && !boxNotificationRef.current.contains(e.target as Node)) {
                        setShowNotification(false)
                  }
            }
            console.log('run2')
            if (!showNotification) {
                  document.removeEventListener('click', onClickGlobal)
                  return
            }
            document.addEventListener('click', onClickGlobal)
            return () => {
                  document.removeEventListener('click', onClickGlobal)
            }
      }, [showNotification])

      console.log('re-render')

      return (
            <div ref={boxNotificationRef} style={{ direction: 'rtl' }} className='relative'>
                  <div className='relative w-max h-max '>
                        <Bell color='blue' onClick={onControllShowNotification} />
                        <div className='absolute top-[-12px] right-[-12px] w-[18px] h-[18px] bg-red-400 text-white rounded-full flex items-center justify-center'>
                              {getMyNotification.data?.data.metadata.notifications
                                    ? getMyNotification.data?.data.metadata.notifications.notification_count
                                    : 0}
                        </div>
                  </div>
                  <div
                        style={{ display: showNotification ? 'flex' : 'none' }}
                        ref={boxNotificationRef}
                        className='animate-mountComponent absolute top-[30px] right-0 w-[350px] h-[400px] bg-green-500 z-[500] overflow-y-scroll'
                  >
                        <div className='w-full px-[12px] py-[10px] h-[1000px]'>
                              {getMyNotification.isSuccess &&
                                    getMyNotification.data?.data.metadata.notifications &&
                                    getMyNotification.data.data.metadata.notifications &&
                                    getMyNotification.data.data.metadata.notifications.notifications_message.map((notification) => {
                                          return (
                                                <div className='flex flex-col'>
                                                      <div style={{ direction: 'ltr' }} className='flex justify-between'>
                                                            <span>{notification.notification_type}</span>
                                                            <span>{convertDateToStringFull(notification.notification_creation_time)}</span>
                                                      </div>
                                                      <div className=''>
                                                            <p>{notification.notification_attribute.notification_content}</p>
                                                      </div>
                                                </div>
                                          )
                                    })}
                        </div>
                  </div>
            </div>
      )
}

export default HeaderNotification
