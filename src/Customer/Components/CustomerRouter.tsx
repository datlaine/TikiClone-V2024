import { BellDot, Lock, LogIn, NotebookPen, ShoppingBag, ShoppingCart, Store, UserRound } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import { useMutation } from '@tanstack/react-query'
import Auth from '../../apis/auth.api'
import { doLogout } from '../../Redux/authenticationSlice'
import { addToast } from '../../Redux/toast'

const CustomerRouter = () => {
      const user = useSelector((state: RootState) => state.authentication.user)
      const dispatch = useDispatch()
      const logoutMutation = useMutation({
            mutationKey: ['logout account'],
            mutationFn: () => Auth.logout(),
            onSuccess: () => {
                  dispatch(doLogout())
                  dispatch(addToast({ type: 'SUCCESS', message: 'Đăng xuất thành công', id: Math.random().toString() }))
            },
            onError: (error) => {
                  console.log({ error })
                  dispatch(addToast({ type: 'ERROR', message: 'Đăng xuất không thành công', id: Math.random().toString() }))
            },
      })
      const handleLogOut = () => {
            logoutMutation.mutate()
      }

      if (window.innerWidth > 1024) {
            return <p>Trang này chỉ hiển thị cho mobile</p>
      }

      return (
            <div className='block '>
                  <div className='ml-[20px] h-[75px] flex items-center gap-[8px] overflow-x-hidden' title={`Account ${user?.email}` || ''}>
                        {user ? (
                              <>
                                    <img
                                          src={user.avatar?.secure_url || user.avartar_url_default || ''}
                                          alt='user_avatar'
                                          className='min-w-[30px] lg:min-w-[40px] w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-full'
                                    />

                                    <div className='flex flex-col gap-[1px]'>
                                          <span>Tài khoản của</span>
                                          {user && <span className='truncate w-[170px]'>{`@${user.email.split('@')[0]}`}</span>}
                                    </div>
                              </>
                        ) : (
                              <div className='flex text-red-700 gap-[15px]'>
                                    <Lock color='red' />
                                    <span className='font-bold'>Permission</span>
                              </div>
                        )}
                  </div>
                  <div className={`customer-item-bg`}>
                        <UserRound />
                        <Link to={'/customer/account'} className='px-[15px] py-[8px] w-full'>
                              Account
                        </Link>
                  </div>

                  <div className={`customer-item-bg `}>
                        <BellDot />

                        <Link to={'/customer/notification'} className='px-[15px] py-[8px] w-full'>
                              Thông báo của tôi
                        </Link>
                  </div>

                  <div className={`customer-item-bg`}>
                        <NotebookPen />
                        <Link to={'/customer/order_history'} className='px-[15px] py-[8px] w-full'>
                              Quản lí đơn hàng
                        </Link>
                  </div>
                  <div className={`customer-item-bg `}>
                        <ShoppingCart />
                        <Link to={'/customer/shop'} className='px-[15px] py-[8px] w-full'>
                              Shop
                        </Link>
                  </div>
                  <div className={`customer-item-bg }`}>
                        <ShoppingBag />
                        <Link to={'/customer/register-sell'} className='px-[15px] py-[8px] w-full'>
                              Đăng kí bán
                        </Link>
                  </div>

                  {user?.verify_email && (
                        <div className={`customer-item-bg `}>
                              <Store />
                              <Link to={'/customer/shop/product-list'} className='px-[15px] py-[8px] w-full'>
                                    Sản phẩm của Shop
                              </Link>
                        </div>
                  )}
                  <div className={`customer-item-bg`} onClick={handleLogOut}>
                        <LogIn />
                        <span className='px-[15px] py-[8px] w-full'>Đăng xuất</span>
                  </div>
            </div>
      )
}

export default CustomerRouter
