import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../../../Redux/authSlice'
import { RootState, store } from '../../../store'
import { clearCart } from '../../../Redux/reducer'
import { useState } from 'react'
import Portal from '../../Portal'
import AuthWrapper from '../../Auth/AuthWrapper'
import { doLogout, doOpenBoxLogin } from '../../../Redux/authenticationSlice'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Auth from '../../../apis/auth.api'
import { addToast } from '../../../Redux/toast'

function HeaderBoxHover() {
      // const { user, doCloseBoxLogin, doOpenBoxLogin, isOpenBoxLogin, userLogout, clearCart } = props
      const navigate = useNavigate()
      const user = useSelector((state: RootState) => state.authentication.user)
      const dispatch = useDispatch()
      const queryClient = useQueryClient()

      const logoutMutation = useMutation({
            mutationKey: ['logout account'],
            mutationFn: () => Auth.logout(),
            onSuccess: () => {
                  dispatch(doLogout())
                  dispatch(addToast({ type: 'SUCCESS', message: 'Đăng xuất thành công', id: Math.random().toString() }))
                  queryClient.removeQueries({ queryKey: ['v1/api/cart/cart-get-my-cart'] })
                  queryClient.removeQueries({
                        queryKey: ['cart-get-count-product'],
                  })
            },
            onError: (error) => {
                  console.log({ error })
                  dispatch(addToast({ type: 'ERROR', message: 'Đăng xuất không thành công', id: Math.random().toString() }))
            },
      })
      // console.log('om', user)
      const handleGoToInfo = () => {
            if (!user) {
                  // doOpenBoxLogin()
                  dispatch(doOpenBoxLogin())
                  return
            }
            navigate('/customer/order_history')
            // console.log(isOpenBoxLogin, user)
      }

      const handleLogOut = () => {
            logoutMutation.mutate()
      }

      return (
            <>
                  <ul className='flex flex-col min-w-[250px] bg-white shadow-xl py-2 gap-2 border border-gray-200 rounded z-20'>
                        <li className='flex items-center h-[35px] hover:bg-[#ccc] px-2'>
                              <Link to={'/customer/account'}>{user ? `Account: ${user.email}` : 'Thông tin tài khoản'}</Link>
                        </li>
                        <li className='flex items-center h-[35px] px-2 hover:bg-[#ccc]' onClick={handleGoToInfo}>
                              Đơn hàng của tôi
                        </li>
                        {user && (
                              <li className='flex items-center h-[35px] px-2 hover:bg-[#ccc]' onClick={handleLogOut}>
                                    Đăng xuất
                              </li>
                        )}
                        <p className='thongBao'></p>
                  </ul>
            </>
      )
}

export default HeaderBoxHover
