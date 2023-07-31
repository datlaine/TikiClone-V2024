import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { doCloseBoxLogin } from '../../../Redux/authSlice'
import Login from '../Login/Login'
import Resister from '../Resister'
import style from './boxLogin.module.css'

function BoxLogin() {
  const isOpenBoxLogin = useSelector((state) => state.auth?.isOpenBoxLogin)
  const dispatch = useDispatch()
  const match = useMatch('/buy/:id')
  const [onModeResister, setOnModeResister] = useState(false)

  useEffect(() => {
    const handleWindowWheel = (event) => {
      if (isOpenBoxLogin) {
        event.preventDefault()
      }
    }
    window.addEventListener('wheel', handleWindowWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWindowWheel)
    }
  }, [isOpenBoxLogin])

  //2 cách so sánh path-> cách 1 so sánh cứng, cách 2 so sánh động
  // console.log(window.location.pathname)
  // console.log(window.location.pathname === match.pathname)
  // console.log(match)

  const handleModeLoginOrResister = (onMode) => {
    console.log('mode: ', onMode.mode)
    if (onMode.mode === 'resister') {
      setOnModeResister(true)
    }
    if (onMode.mode === 'login') {
      setOnModeResister(false)
    }
  }

  return (
    <div className={style.boxContainerLogin}>
      <div className={style.boxLogin} onClick={(e) => e.stopPropagation()}>
        <div className={style.boxIconClose} onClick={() => dispatch(doCloseBoxLogin())}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </div>
        <div className={style.boxSideLeft}>
          {onModeResister ? (
            <Resister handleModeLoginOrResister={handleModeLoginOrResister} />
          ) : (
            <Login handleModeLoginOrResister={handleModeLoginOrResister} />
          )}
        </div>
        <div className={style.boxSideRight}>
          <img src={require('../imageLogin.png')} alt='' />
          <div className={style.boxContent}>
            <p>Mua sắm tại Tiki</p>
            <p>Siêu ưa đãi mỗi ngày</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxLogin
