import React, { memo, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import NotFound from '../component/Errors/NotFound'
import CustomerWrapperItem from './Components/CustomerWrapperItem'
import AuthPermission from '../component/Auth/AuthPermission'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Lock } from 'lucide-react'
import { UserRound } from 'lucide-react'
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
      const user = useSelector((state: RootState) => state.authentication.user)
      const auth = Boolean(user)

      if (pathName === '/customer') return <NotFound />
      const textLink = link.find((pathItem) => {
            if (pathItem.path === pathName) return pathItem
      })

      console.log('1', textLink)

      const handleActive = (pathName: string) => {
            setSectionActive(pathName)
      }

      return (
            <>
                  <div className='px-[75px] w-full pt-[15px] xl:pt-[0px] mt-0 xl:mt-[10px]'>
                        <div className='mb-[1px]'>
                              <Link to={'/'}>Trang chủ</Link>
                              <span> {' > '}</span>
                              <Link className='' to={textLink?.path as string}>
                                    {textLink?.text}
                              </Link>
                        </div>

                        <div className='flex gap-[1%] min-h-[450px]  h-[auto] '>
                              <div className='hidden  xl:block lg:w-[24%]'>
                                    <div
                                          className='h-[75px] flex items-center gap-[8px] overflow-x-hidden'
                                          title={`Account ${user?.email}` || ''}
                                    >
                                          {user ? (
                                                <>
                                                      <img
                                                            src={user.sercel_url || ''}
                                                            alt='user_avatar'
                                                            className='w-[40px] h-[40px] rounded-full'
                                                      />

                                                      <div className='flex flex-col gap-[1px]'>
                                                            <span>Tài khoản của</span>
                                                            {user && (
                                                                  <span className='truncate w-[170px]'>{`@${
                                                                        user.email.split('@')[0]
                                                                  }`}</span>
                                                            )}
                                                      </div>
                                                </>
                                          ) : (
                                                <div className='flex text-red-700 gap-[15px]'>
                                                      <UserRound />

                                                      <Lock color='red' />
                                                      <span className='font-bold'>Permission</span>
                                                </div>
                                          )}
                                    </div>
                                    <div
                                          className={`customer-item-bg ${textLink?.path === '/customer/account' ? 'isActive' : ''}`}
                                          onClick={(e) => handleActive('/customer/account')}
                                    >
                                          <UserRound />
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
                              <div className='w-full 2xl:w-[75%]'>
                                    <div className='h-[55px] flex items-center'>{textLink?.text}</div>
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
