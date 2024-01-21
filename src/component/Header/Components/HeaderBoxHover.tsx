import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { doCloseBoxLogin, doOpenBoxLogin, userLogout } from '../../../Redux/authSlice'
import { RootState, store } from '../../../store'
import { clearCart } from '../../../Redux/reducer'
import { useState } from 'react'
import Portal from '../../Portal'
import AuthWrapper from '../../Auth/AuthWrapper'
import { doLogout } from '../../../Redux/authenticationSlice'
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProp>

function HeaderBoxHover(props: Props) {
      // const { user, doCloseBoxLogin, doOpenBoxLogin, isOpenBoxLogin, userLogout, clearCart } = props
      const navigate = useNavigate()
      const [showBoxAuth, setShowBoxAuth] = useState(false)
      const user = useSelector((state: RootState) => state.authentication.user)
      const dispatch = useDispatch()
      // console.log('om', user)
      const handleGoToInfo = () => {
            if (!user) {
                  // doOpenBoxLogin()
                  setShowBoxAuth(true)
                  return
            }
            navigate('/customer/order_history')
            // console.log(isOpenBoxLogin, user)
      }

      const handleLogOut = () => {
            dispatch(doLogout())
            // if (user) {
            //       setTimeout(() => {
            //             navigate('/')
            //       }, 1000)
            //       alert('Đăng xuất thành công')
            //       userLogout()
            //       doCloseBoxLogin()
            //       clearCart()
            // }
      }

      return (
            <>
                  <ul className='flex flex-col min-w-[250px] bg-white shadow-xl py-2 gap-2 border border-gray-200 rounded'>
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
                  {showBoxAuth && (
                        <Portal>
                              <AuthWrapper setShowBoxAuth={setShowBoxAuth} />
                        </Portal>
                  )}
            </>
      )
}

const mapStateToProps = (state: RootState) => ({
      user: state.auth.userCurrent,
      isOpenBoxLogin: state.auth.isOpenBoxLogin,
})

const mapDispatchToProp = (dispatch: any) => ({
      doCloseBoxLogin: () => store.dispatch(doCloseBoxLogin()),
      doOpenBoxLogin: () => store.dispatch(doOpenBoxLogin()),
      userLogout: () => store.dispatch(userLogout()),
      clearCart: () => store.dispatch(clearCart()),
})

export default connect(mapStateToProps, mapDispatchToProp)(HeaderBoxHover)
