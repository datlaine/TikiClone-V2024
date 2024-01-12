import React, { memo, useEffect, useState } from 'react'
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import NotFound from '../component/Errors/NotFound'
import CustomerWrapperItem from './Components/CustomerWrapperItem'

const link = [
      { path: '/customer/account', text: 'Thông tin tài khoản' },
      { path: '/customer/notification', text: 'Thông báo của tôi' },
      { path: '/customer/order_history', text: 'Quản lí đơn hàng' },
]

const Customer = () => {
      const pathName = useLocation()?.pathname
      const [sectionActive, setSectionActive] = useState('/customer/account')

      if (pathName === '/customer') return <NotFound />
      const textLink = link.find((pathItem) => {
            if (pathItem.path === pathName) return pathItem
      })

      console.log('1', textLink)

      const handleActive = (pathName: string) => {
            setSectionActive(pathName)
      }

      return (
            <div className='px-[50px] w-full mt-[-15px]'>
                  <div className='mb-[5px]'>
                        <Link to={'/'}>Trang chủ</Link>
                        <span> {' > '}</span>
                        <Link className='' to={textLink?.path as string}>
                              {textLink?.text}
                        </Link>
                  </div>

                  <div className='flex gap-[3%]'>
                        <div className='hidden  lg:block lg:w-[20%]'>
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
                        <div className='w-[73%]'>
                              <div className='h-[75px] flex items-center'>{textLink?.text}</div>
                              <CustomerWrapperItem>
                                    <Outlet />
                              </CustomerWrapperItem>
                        </div>
                  </div>
            </div>
      )
}

export default memo(Customer)
