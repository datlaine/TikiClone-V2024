import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { doCloseBoxLogin } from '../../../Redux/authSlice'
import Login from '../Login/Login'
import Resister from '../Resister'
import style from './boxLogin.module.css'
import { store } from '../../../store'
import { createPortal } from 'react-dom'

function BoxLogin(props) {
    const [onModeResister, setOnModeResister] = useState(false)
    const { doCloseBoxLogin, isOpenBoxLogin } = props
    useEffect(() => {
        const handleWindowWheel = (event) => {
            if (isOpenBoxLogin) {
                event.preventDefault()
            }
        }
        window.addEventListener('wheel', handleWindowWheel, {
            passive: false,
        })
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
        <div className=''>
            {createPortal(
                <div
                    className='

fixed z-[998] top-0 left-0 right-0 bottom-0 bg-[rgba(12,20,11,.9)] min-h-screen h-auto'
                >
                    <div className='fixed z-[999] top-[50%] left-[50%] right-0 bottom w-[350px] max-h-screens lg:w-[600px] lg:h-[550px] 2xl:w-[800px] 2xl:h-[500px] translate-x-[-50%] translate-y-[-50%]'>
                        <div
                            className={`flex bg-white rounded-lg ${
                                onModeResister ? 'py-[15px] lg:py[35px]' : 'py-[5px] lg:py[35px]'
                            }  2xl:py-0 2xl:gap-4`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={style.boxIconClose} onClick={() => doCloseBoxLogin()}>
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
                            <div
                                className={`p-[20px] w-full 2xl:flex-[0_0_60%] ${
                                    onModeResister ? 'lg:py-[30px] 2xl:py-[45px]' : 'lg:py-[10px] 2xl:py-[15px]'
                                }`}
                            >
                                {onModeResister ? (
                                    <Resister handleModeLoginOrResister={handleModeLoginOrResister} />
                                ) : (
                                    <Login handleModeLoginOrResister={handleModeLoginOrResister} />
                                )}
                            </div>
                            <div className='hidden bg-gradient-to-t from-sky-400 to-cyan-400 2xl:flex-[0_0_40%] 2xl:flex 2xl:flex-col  2xl:items-center 2xl:gap-8 2xl:py-[35px]'>
                                <img src={require('../imageLogin.png')} alt='' className='w-[203px] h-[203px]' />
                                <div className='2xl:flex flex-col flex-1 justify-center'>
                                    <p className='font-bold text-[#0b74e5] text-xl'>Mua sắm tại Tiki</p>
                                    <p className='text-[#0b74e5]'>Siêu ưa đãi mỗi ngày</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body,
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isOpenBoxLogin: state.auth.isOpenBoxLogin,
})

const mapDispatchToProps = (dispatch) => ({
    doCloseBoxLogin: () => store.dispatch(doCloseBoxLogin()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BoxLogin)
