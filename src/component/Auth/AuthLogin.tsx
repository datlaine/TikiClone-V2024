import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { TModeAuth } from './AuthWrapper'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type TProps = {
      setModeAuth: React.Dispatch<SetStateAction<TModeAuth>>
}

type TFormLogin = {
      email: string
      password: string
}

const defaultValues: TFormLogin = {
      email: '',
      password: '',
}

const loginSchema = z.object({
      email: z
            .string()
            .min(1, { message: 'Email là bắt buộc' })
            .email({ message: 'Email không hợp lệ' })
            .max(50, { message: 'Giới hạn 50 kí tự' }),
      password: z.string().min(1, { message: 'Mật khẩu là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' }),
})

type loginZodSchemaType = z.infer<typeof loginSchema>

const AuthLogin = (props: TProps) => {
      const { setModeAuth } = props

      const [showError, setShowError] = useState(false)
      const [showPassword, setShowPassword] = useState(false)
      const refInputPassword = useRef<HTMLInputElement>(null)

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<loginZodSchemaType>({
            defaultValues,
            resolver: zodResolver(loginSchema),
      })

      const handleShowHidePassword = () => {
            setShowPassword((prev) => !prev)
      }

      useEffect(() => {
            if (refInputPassword.current) {
                  console.log('alo')
                  showPassword ? (refInputPassword.current.type = 'text') : (refInputPassword.current.type = 'password')
            }
      }, [showPassword])

      const onSubmit = (form: TFormLogin) => {
            console.log(form, errors)
      }

      return (
            <div className='flex flex-col items-center gap-[15px] py-[35px]'>
                  <h3 className='font-black text-slate-900 tracking-[5px] text-[24px]'>Login</h3>
                  <h4 className='text-stone-600 italic text-[16px] opacity-80 px-[12px]'>Đăng nhập để trải nghiệm mua sắm thỏa thích</h4>
                  <form className='flex flex-1 flex-col gap-[20px] mt-[12px] w-[70%]' noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full'>
                              <input
                                    {...register('email')}
                                    type='text'
                                    className='w-full border-[1px] border-stone-300 focus:border-slate-900  focus:border-[2px]'
                                    placeholder='email'
                              />
                        </div>
                        {errors.email && <span className='text-red-700 italic'>{errors.email.message}</span>}
                        <div className='w-full relative flex items-center'>
                              <input
                                    {...register('password')}
                                    ref={refInputPassword}
                                    type='text'
                                    className='w-full border-[1px] border-stone-300 focus:border-slate-900 focus:border-[2px]'
                                    placeholder='password'
                              />
                              {
                                    <span className='absolute right-[5px]' onClick={handleShowHidePassword}>
                                          {showPassword ? <EyeOff /> : <Eye />}
                                    </span>
                              }
                        </div>
                        {errors.password && <span className='text-red-700 italic'>{errors.password.message} 123</span>}

                        <div className=''>
                              <p>
                                    Bạn chưa có tài khoản,{' '}
                                    <span className='underline text-slate-900' onClick={() => setModeAuth('Register')}>
                                          đăng kí nhé
                                    </span>
                              </p>
                        </div>
                        <button
                              type='submit'
                              className='w-full h-[60px] rounded-lg bg-slate-900 text-white disabled:bg-stone-400 disabled:cursor-not-allowed'
                              disabled={showError}
                              title={showError ? 'Vui lòng nhập thông tin hợp lệ' : `Đăng nhập ${showError}`}
                        >
                              Login
                        </button>
                  </form>
            </div>
      )
}

export default AuthLogin
