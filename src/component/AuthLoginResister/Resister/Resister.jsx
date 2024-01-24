import React, { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authLogin } from '../../../ConnectToServer/auth'
import { useForm } from 'react-hook-form'
import style from './resister.module.css'
import { rulesVerify } from '../rules'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { doCloseBoxLogin } from '../../../Redux/authSlice'

const initFormResister = {
    email: '',
    password: '',
    confirm_password: '',
}

export default function Resister({ handleModeLoginOrResister }) {
    const [formResister, setFormResister] = useState(initFormResister)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm()
    const rules = rulesVerify(getValues)

    // const mutateResister = useMutation({
    //   mutationFn: (body) => authResister(body),
    //   onSuccess: (res) => console.log(res),
    // })

    // const handleChangeInput = (e, name) => {
    //   setFormResister((prev) => ({ ...prev, [name]: e.target.value }))
    // }

    // const handleSubmitDefault = (e) => {
    //   e.preventDefault()
    //   console.log(formResister)
    //   // mutateLogin.mutate(formLogin)
    // }

    const onSubmit = handleSubmit(
        (data) => {
            console.log(data)
            alert(JSON.stringify(data))
            toast.warn('Vui lòng chờ', {
                autoClose: 800,
            })
            setTimeout(() => {
                setIsLoading(true)
            }, 1500)
            setTimeout(() => {
                setIsLoading(false)
                toast.success('Đăng kí thành công', {
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: false,
                })
                reset({
                    email: '',
                    password: '',
                    confirm_password: '',
                })
            }, 2500)
            setTimeout(() => {
                dispatch(doCloseBoxLogin())
            }, 4500)
        },
        (data) => {
            console.log(data)
        },
    )

    const handleTypePassword = (id) => {
        console.log(id)
        const ele = document.getElementById(`${id}`)
        console.log(ele)
        if (ele) {
            if (ele.type === 'password') {
                ele.type = 'text'
            } else {
                ele.type = 'password'
            }
        } else return null
    }

    const onLogin = () => {
        handleModeLoginOrResister({ mode: 'login' })
    }

    return (
        <div className={style.containerResister}>
            <p>Đăng kí tài khoản</p>
            <p>Đăng nhập hoặc tạo tài khoản</p>
            <form onSubmit={onSubmit}>
                <div className={style.formEmail}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' {...register('email', rules.email)} />
                </div>
                <p className='text-red-950'>{errors.email?.message}</p>
                <div className={style.formPassword}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' {...register('password', rules.password)} />
                    <div className={style.iconEyes} onClick={() => handleTypePassword('password')}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                            />
                        </svg>
                    </div>
                </div>
                <p className='text-red-950'>{errors.password?.message}</p>
                <div className={style.formPassword}>
                    <label htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
                    <input type='password' id='confirm_password' {...register('confirm_password', rules.confirm_password)} />
                    <div className={style.iconEyes} onClick={() => handleTypePassword('confirm_password')}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                            />
                        </svg>
                    </div>
                </div>
                <p className='text-red-950'>{errors.confirm_password?.message}</p>
                <hr />
                <button
                    type='submit'
                    className={style.btnForm}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '15px',
                        backgroundColor: isLoading ? 'rgb(204 204 204)' : 'rgb(255, 66, 78)',
                    }}
                >
                    {isLoading ? (
                        <div role='status'>
                            <svg
                                aria-hidden='true'
                                className='w-[16px] h-[16px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                    fill='currentColor'
                                />
                                <path
                                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                    fill='currentFill'
                                />
                            </svg>
                            <span className='sr-only'>Loading...</span>
                        </div>
                    ) : (
                        ''
                    )}{' '}
                    Đăng Kí
                </button>
            </form>
            <p>
                Bạn chưa có tài khoản, <span onClick={onLogin}>Đăng nhập ngay</span>
            </p>
            <ToastContainer />
        </div>
    )
}
