import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../../../Redux/authSlice'
import { RootState, store } from '../../../store'
import { clearCart } from '../../../Redux/reducer'
import { useState } from 'react'
import Portal from '../../Portal'
import AuthWrapper from '../../Auth/AuthWrapper'
import { doOpenBoxLogin } from '../../../Redux/authenticationSlice'

function HeaderBoxHover() {
    // const { user, doCloseBoxLogin, doOpenBoxLogin, isOpenBoxLogin, userLogout, clearCart } = props
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.authentication.user)
    const dispatch = useDispatch()
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
        // dispatch(doLogout())
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
