import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doCloseBoxLogin, doOpenBoxLogin, userLogout } from '../../../Redux/authSlice'
import { store } from '../../../store'
import { clearCart } from '../../../Redux/reducer'

function HeaderBoxHover(props) {
  const { user, doCloseBoxLogin, doOpenBoxLogin, isOpenBoxLogin, userLogout, clearCart } = props
  const navigate = useNavigate()
  console.log('om', user)
  const handleGoToInfo = () => {
    console.log(isOpenBoxLogin, user)
    if (!user) {
      doOpenBoxLogin()
    }
  }

  const handleLogOut = () => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
      // elThongBao.textContent = 'Đăng xuất thành công'
      // setTimeout(() => {
      //     elThongBao.textContent = ''
      // },500)
      alert('Đăng xuất thành công')
      userLogout()
      doCloseBoxLogin()
      clearCart()
    }
  }

  return (
    <ul className='text-[15.2px] absolute top-[40px] min-w-[250px] right-0 min-h-[100px] bg-white shadow-[rgba(0, 0, 0, 0.18) 0px 6px 12px 0px] hover:flex hidden group-hover:flex flex-col py-2'>
      <li className='flex items-center h-[35px] hover:bg-[#ccc] px-2' onClick={handleGoToInfo}>
        {user ? `Account: ${user}` : 'Thông tin tài khoản'}
      </li>
      <li className='flex items-center h-[35px] px-2 hover:bg-[#ccc]' onClick={handleGoToInfo}>Đơn hàng của tôi</li>
      {user && (
        <li className='flex items-center h-[35px] px-2 hover:bg-[#ccc]' onClick={handleLogOut}>
          Đăng xuất
        </li>
      )}
      <p className='thongBao'></p>
    </ul>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.userCurrent,
  isOpenBoxLogin: state.auth.isOpenBoxLogin,
})

const mapDispatchToProp = (dispatch) => ({
  doCloseBoxLogin: () => store.dispatch(doCloseBoxLogin()),
  doOpenBoxLogin: () => store.dispatch(doOpenBoxLogin()),
  userLogout: () => store.dispatch(userLogout()),
  clearCart: ()=> store.dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProp)(HeaderBoxHover)
