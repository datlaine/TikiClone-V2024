import React, { memo, useLayoutEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import NotFound from '../component/Errors/NotFound'
import CustomerWrapperItem from './Components/CustomerWrapperItem'
import Portal from '../component/Portal'
import AuthWrapper from '../component/Auth/AuthWrapper'
import AuthPermission from '../component/Auth/AuthPermission'

const link = [
      { path: '/customer/account', text: 'Thông tin tài khoản' },
      { path: '/customer/notification', text: 'Thông báo của tôi' },
      { path: '/customer/order_history', text: 'Quản lí đơn hàng' },
      { path: '/customer/account/edit/email', text: 'Cập nhập email' },
      { path: '/customer/account/edit/pass', text: 'Cập nhập password' },
]

const Customer = () => {
      let pathName = useLocation()?.pathname
      console.log(useLocation())
      const [_, setSectionActive] = useState('/customer/account')
      const auth = true

      if (pathName === '/customer') return <NotFound />
      const textLink = link.find((pathItem) => {
            if (pathItem.path === pathName) return pathItem
      })

      console.log('1', textLink)

      const handleActive = (pathName: string) => {
            setSectionActive(pathName)
      }

      console.log('ss', pathName)
      return (
            <>
                  <div className='px-[50px] w-full pt-[15px] xl:pt-[0px] mt-0 xl:mt-[15px]'>
                        <div className='mb-[5px]'>
                              <Link to={'/'}>Trang chủ</Link>
                              <span> {' > '}</span>
                              <Link className='' to={textLink?.path as string}>
                                    {textLink?.text}
                              </Link>
                        </div>

                        <div className='flex gap-[3%] min-h-[450px]  h-[auto]'>
                              <div className='hidden  xl:block lg:w-[20%]'>
                                    <div className='h-[75px] flex items-center gap-[15px]'>
                                          <div className='w-[45px] h-[45px] rounded-full bg-red-300'></div>
                                          <div className='flex flex-col gap-[2px]'>
                                                <span>Tài khoản của</span>
                                                <span>Rose</span>
                                          </div>
                                    </div>
                                    <div
                                          className={`customer-item-bg ${textLink?.path === '/customer/account' ? 'isActive' : ''}`}
                                          onClick={(e) => handleActive('/customer/account')}
                                    >
                                          <div className='w-[20px] h-[20px] bg-blue-500 rounded-full'></div>
                                          <Link to={'/customer/account'} className='p-[15px] w-full'>
                                                Account
                                          </Link>
                                    </div>

                                    <div
                                          className={`customer-item-bg ${textLink?.path === '/customer/notification' ? 'isActive' : ''}`}
                                          onClick={(e) => handleActive('/customer/notification')}
                                    >
                                          <div className='w-[20px] h-[20px] bg-blue-500 rounded-full'></div>
                                          <Link to={'/customer/notification'} className='p-[15px] w-full'>
                                                Thông báo của tôi
                                          </Link>
                                    </div>

                                    <div
                                          className={`customer-item-bg ${textLink?.path === '/customer/order_history' ? 'isActive' : ''}`}
                                          onClick={(e) => handleActive('/customer/order_history')}
                                    >
                                          <div className='w-[20px] h-[20px] bg-blue-500 rounded-full'></div>
                                          <Link to={'/customer/order_history'} className='p-[15px] w-full'>
                                                Quản lí đơn hàng
                                          </Link>
                                    </div>
                              </div>
                              <div className='w-full 2xl:w-[73%]'>
                                    <div className='h-[75px] flex items-center'>{textLink?.text}</div>
                                    {auth ? (
                                          <CustomerWrapperItem>
                                                <Outlet />
                                          </CustomerWrapperItem>
                                    ) : (
                                          <AuthPermission />
                                    )}
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default memo(Customer)
