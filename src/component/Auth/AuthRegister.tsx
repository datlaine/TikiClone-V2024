import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { TModeAuth } from './AuthWrapper'
import { Eye, EyeOff } from 'lucide-react'

type TProps = {
      setModeAuth: React.Dispatch<SetStateAction<TModeAuth>>
}

const AuthRegister = (props: TProps) => {
      const { setModeAuth } = props
      const [setError, showSetError] = useState(false)

      const [showPassword, setShowPassword] = useState(false)
      const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

      const refInputPassword = useRef<HTMLInputElement>(null)
      const refInputPasswordConfirm = useRef<HTMLInputElement>(null)

      const handleShowHidePassword = () => {
            setShowPassword((prev) => !prev)
      }

      const handleShowHidePasswordConfirm = () => {
            setShowPasswordConfirm((prev) => !prev)
      }

      useEffect(() => {
            if (refInputPassword.current) {
                  showPassword ? (refInputPassword.current.type = 'text') : (refInputPassword.current.type = 'password')
            }

            if (refInputPasswordConfirm.current) {
                  showPassword ? (refInputPasswordConfirm.current.type = 'text') : (refInputPasswordConfirm.current.type = 'password')
            }
      }, [showPassword, showPasswordConfirm])
      return (
            <div className='flex flex-col items-center gap-[15px] py-[35px]'>
                  <h3 className='font-black text-slate-900 tracking-[5px] text-[24px]'>Register</h3>
                  <h4 className='text-stone-600 italic text-[16px] opacity-80 px-[12px]'>Đăng kí để cùng trải nghiệm cảm giác mua sắm</h4>
                  <form className='flex flex-1 flex-col gap-[20px] mt-[12px] w-[70%]'>
                        <div className='w-full'>
                              <input
                                    type='text'
                                    className='w-full border-[1px] border-stone-300 focus:border-slate-900  focus:border-[2px]'
                                    placeholder='email'
                              />
                        </div>
                        {setError && <span className='text-red-700 italic'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>}
                        <div className='w-full relative flex items-center'>
                              <input
                                    ref={refInputPassword}
                                    type='password'
                                    className='w-full border-[1px] border-stone-300 focus:border-slate-900 focus:border-[2px]'
                                    placeholder='password'
                              />
                              <span className='absolute right-[5px]' onClick={handleShowHidePassword}>
                                    {showPassword ? <EyeOff /> : <Eye />}
                              </span>
                        </div>
                        {setError && <span className='text-red-700 italic'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>}

                        <div className='w-full relative flex items-center'>
                              <input
                                    ref={refInputPasswordConfirm}
                                    type='password'
                                    className='w-full border-[1px] border-stone-300 focus:border-slate-900 focus:border-[2px]'
                                    placeholder='Xác nhận pasword'
                              />
                              <span className='absolute right-[5px]' onClick={handleShowHidePasswordConfirm}>
                                    {showPassword ? <EyeOff /> : <Eye />}
                              </span>
                        </div>
                        {setError && <span className='text-red-700 italic'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>}
                        <div className=''>
                              <p>
                                    Bạn đã có tài khoản, {''}
                                    <span className='underline text-slate-900' onClick={() => setModeAuth('Login')}>
                                          quay lại đăng nhập
                                    </span>
                              </p>
                        </div>
                        <div className='w-full'>
                              <button
                                    className='w-full h-[60px] rounded-lg bg-slate-900 text-white disabled:bg-stone-400 disabled:cursor-not-allowed'
                                    disabled={setError}
                                    title={setError ? 'Vui lòng nhập thông tin hợp lệ' : 'Đăng nhập'}
                              >
                                    Login
                              </button>
                        </div>
                  </form>
            </div>
      )
}

export default AuthRegister
