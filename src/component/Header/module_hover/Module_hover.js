import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { doCloseBoxLogin, doOpenBoxLogin } from '../../../Redux/authSlice'
import './module_hover.css'

function ModuleHover() {
  const user = JSON.parse(localStorage.getItem('account')) || null
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoToInfo = () => {
    if (!user) {
      dispatch(doOpenBoxLogin())
    }
  }

  const handleLogOut = () => {
    if (user) {
      dispatch(doCloseBoxLogin())
      console.log('click')
      setTimeout(() => {
        navigate('/')
      }, 1000)
      localStorage.removeItem('account')
      const elThongBao = document.getElementsByClassName('thongBao')[0]
      alert('Đăng xuất thành công')
      // elThongBao.textContent = 'Đăng xuất thành công'
      // setTimeout(() => {
      //     elThongBao.textContent = ''
      // },500)
    } else {
      dispatch(doCloseBoxLogin())
    }
  }

  return (
    <ul id='module_hover'>
      <li className='module_hover_item' onClick={handleGoToInfo}>
        {user ? `Account: ${user}` : 'Thông tin tài khoản'}
      </li>
      <li className='module_hover_item'>Đơn hàng của tôi</li>
      <li className='module_hover_item' onClick={handleLogOut}>
        Đăng xuất
      </li>
      <p className='thongBao'></p>
    </ul>
  )
}

export default ModuleHover
