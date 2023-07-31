import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { doCloseBoxLogin, doOpenBoxLogin } from '../../../Redux/authSlice'
import './module_hover.css'

function ModuleHover() {
  const user = useSelector((state) => state.auth?.userCurrent)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoToInfo = () => {
    if (!user) {
      dispatch(doOpenBoxLogin())
    }
  }

  const handleLogOut = () => {
    if (user) {
      localStorage.removeItem('account')
      dispatch(doCloseBoxLogin())
      setTimeout(() => {
        console.log('123')
        navigate('/')
      }, 2000)
      toast.success('Đăng xuất thành công')
    } else {
      dispatch(doCloseBoxLogin())
    }
  }

  return (
    <ul id='module_hover'>
      <li className='module_hover_item' onClick={handleGoToInfo}>
        Thông tin tài khoản
      </li>
      <li className='module_hover_item'>Đơn hàng của tôi</li>
      <li className='module_hover_item' onClick={handleLogOut}>
        Đăng xuất
      </li>
      <ToastContainer />
    </ul>
  )
}

export default ModuleHover
