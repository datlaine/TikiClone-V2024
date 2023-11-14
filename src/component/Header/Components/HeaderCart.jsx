import React from 'react'
import { useDispatch } from 'react-redux'
import { doCloseBoxLogin } from '../../../Redux/authSlice'
import { useNavigate } from 'react-router-dom'

const HeaderCart = (props) => {
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const { isAuth, isQuanTiTyProduct, doOpenBoxLogin } = props
  const goToCart = () => {
    if (!isAuth) {
  console.log('cart')
    doOpenBoxLogin()
    } else {
      navigate('/Cart')

      console.log(isAuth)
      console.log('success')
    }
  }

  return (
    <div className='basis-0.5/6 flex items-center justify-center'>
      <span className='cart' onClick={goToCart}>
        <img src='https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png' alt='' />
        <span className='numbers-cart'>{isQuanTiTyProduct}</span>
      </span>
    </div>
  )
}

export default HeaderCart
