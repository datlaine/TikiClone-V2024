import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doCloseBoxLogin, doOpenBoxLogin, userLogout } from '../../../Redux/authSlice'
import { RootState, store } from '../../../store'
import { clearCart } from '../../../Redux/reducer'
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProp>

function HeaderBoxHover(props: Props) {
      const { user, doCloseBoxLogin, doOpenBoxLogin, isOpenBoxLogin, userLogout, clearCart } = props
      const navigate = useNavigate()
      // console.log('om', user)
      const handleGoToInfo = () => {
            // console.log(isOpenBoxLogin, user)
            if (!user) {
                  doOpenBoxLogin()
            }
      }

      const handleLogOut = () => {
            if (user) {
                  setTimeout(() => {
                        navigate('/')
                  }, 1000)
                  alert('Đăng xuất thành công')
                  userLogout()
                  doCloseBoxLogin()
                  clearCart()
            }
      }

      return (
            <ul className='flex flex-col min-w-[250px] bg-white shadow-xl py-2 gap-2 border border-gray-200 rounded'>
                  <li className='flex items-center h-[35px] hover:bg-[#ccc] px-2' onClick={handleGoToInfo}>
                        {user ? `Account: ${user}` : 'Thông tin tài khoản'}
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
