import React, { SetStateAction, useState } from 'react'
import { TModeAuth } from './AuthWrapper'
import { Eye, EyeOff, ShieldX } from 'lucide-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Auth from '../../apis/auth.api'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../Redux/authenticationSlice'
type TProps = {
      setModeAuth: React.Dispatch<SetStateAction<TModeAuth>>
}

const registerSchema = z
      .object({
            email: z
                  .string()
                  .min(1, { message: 'Email là bắt buộc' })
                  .email({ message: 'Email không hợp lệ' })
                  .max(50, { message: 'Giới hạn 50 kí tự' }),
            password: z.string().min(1, { message: 'Mật khẩu là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' }),
            confirm_password: z.string().min(1, { message: 'Xác thực mật khẩu là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' }),
      })
      .refine((form) => form.password === form.confirm_password, {
            message: 'Mật khẩu không khớp',
            path: ['confirm_password'],
      })

type TRegisterZodSchema = z.infer<typeof registerSchema>
const defaultValues: TRegisterZodSchema = {
      email: '',
      password: '',
      confirm_password: '',
}

const AuthRegister = (props: TProps) => {
      //Mode auth => Login | register
      const { setModeAuth } = props
      const dispatch = useDispatch()

      //react hooks form
      const {
            handleSubmit,
            register,
            formState: { errors },
      } = useForm<TRegisterZodSchema>({
            defaultValues,
            resolver: zodResolver(registerSchema),
      })

      const authRegister = useMutation({
            mutationKey: ['register'],
            mutationFn: (data: Omit<TRegisterZodSchema, 'confirm_password'>) => Auth.register(data),
            onSuccess: (res) => {
                  dispatch(fetchUser({ user: res.data.metadata.user, access_token: res.data.metadata.access_token as string }))
            },

            onError: (data: unknown) => console.log('error data check', data),
      })

      //type input
      const [typePassword, setTypePassword] = useState<'password' | 'text'>('password')
      const [typeConfirmPassword, setTypeConfirmPassword] = useState<'password' | 'text'>('password')

      //change type
      const handleShowHidePassword = () => {
            if (typePassword === 'password') {
                  setTypePassword('text')
                  return
            } else {
                  setTypePassword('password')
            }
      }

      const handleShowHidePasswordConfirm = () => {
            if (typeConfirmPassword === 'password') {
                  setTypeConfirmPassword('text')
                  return
            } else {
                  setTypeConfirmPassword('password')
            }
      }

      const onSubmit = (data: TRegisterZodSchema) => {
            console.log('data', data)
            authRegister.mutate(data)
      }

      return (
            <div className='flex flex-col items-center gap-[15px] py-[35px]'>
                  <h3
                        className={`${
                              Object.keys(errors).length > 0 ? 'text-red-700' : 'text-slate-900'
                        } font-black tracking-[5px] text-[24px]`}
                  >
                        Register
                  </h3>
                  <h4
                        className={`${
                              Object.keys(errors).length > 0 ? 'text-red-700' : 'text-stone-600'
                        } italic text-[16px] opacity-80 px-[12px]`}
                  >
                        Đăng kí để cùng trải nghiệm cảm giác mua sắm
                  </h4>
                  <form className='flex flex-1 flex-col gap-[20px] mt-[12px] w-[70%]' onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full'>
                              <input
                                    {...register('email')}
                                    type='text'
                                    className={`w-full border-[1px] border-stone-300 focus:border-[2px] ${
                                          errors.email
                                                ? 'focus:border-red-700 placeholder:text-red-700 placeholder:italic text-[12px] border-red-700'
                                                : 'focus:border-slate-900 placeholder:text-stone-500  border-stone-300'
                                    }
}`}
                                    placeholder='Email'
                              />
                        </div>
                        {errors.email && (
                              <div className='flex gap-[6px] items-center mt-[-10px]'>
                                    <ShieldX size={'18px'} color={'red'} />
                                    <span className='text-red-700 italic  text-[13px]'>{errors.email.message}</span>
                              </div>
                        )}
                        <div className='w-full relative flex items-center'>
                              <input
                                    {...register('password')}
                                    type={typePassword}
                                    className={`w-full border-[1px] border-stone-300  focus:border-[2px] ${
                                          errors.password
                                                ? 'focus:border-red-700 placeholder:text-red-700 placeholder:italic text-[12px] border-red-700'
                                                : 'focus:border-slate-900 placeholder:text-stone-500  border-stone-300'
                                    }`}
                                    placeholder='Mật khẩu'
                              />
                              <span className='absolute right-[5px]' onClick={handleShowHidePassword}>
                                    {typePassword === 'text' ? (
                                          <EyeOff size={'20px'} color={errors.password ? 'red' : 'black'} />
                                    ) : (
                                          <Eye size={'20px'} color={errors.password ? 'red' : 'black'} />
                                    )}
                              </span>
                        </div>
                        {errors.password && (
                              <div className='flex gap-[6px] items-center mt-[-10px]'>
                                    <ShieldX size={'18px'} color={'red'} />
                                    <span className='text-red-700 italic  text-[13px]'>{errors.password.message}</span>
                              </div>
                        )}

                        <div className='w-full relative flex items-center'>
                              <input
                                    {...register('confirm_password')}
                                    type={typeConfirmPassword}
                                    className={`w-full border-[1px]   focus:border-[2px] ${
                                          errors.confirm_password
                                                ? 'focus:border-red-700 placeholder:text-red-700 placeholder:italic text-[12px] border-red-700'
                                                : 'focus:border-slate-900 placeholder:text-stone-500  border-stone-300'
                                    }`}
                                    placeholder='Xác nhận mật khẩu'
                              />
                              <span className='absolute right-[5px]  ' onClick={handleShowHidePasswordConfirm}>
                                    {typeConfirmPassword === 'text' ? (
                                          <EyeOff size={'20px'} color={errors.confirm_password ? 'red' : 'black'} />
                                    ) : (
                                          <Eye size={'20px'} color={errors.confirm_password ? 'red' : 'black'} />
                                    )}
                              </span>
                        </div>
                        {errors.confirm_password && (
                              <div className='flex gap-[6px] items-center mt-[-10px]'>
                                    <ShieldX size={'18px'} color={'red'} />
                                    <span className='text-red-700 italic  text-[13px]'>{errors.confirm_password.message}</span>
                              </div>
                        )}
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
                                    disabled={Object.keys(errors).length > 0}
                                    title={Object.keys(errors).length > 0 ? 'Vui lòng nhập thông tin hợp lệ' : 'Đăng kí'}
                              >
                                    Register
                              </button>
                        </div>
                  </form>
            </div>
      )
}

export default AuthRegister
