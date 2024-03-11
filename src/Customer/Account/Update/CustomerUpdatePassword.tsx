import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// () => api

const updatePasswordSchema = z
      .object({
            password: z.string().min(1, { message: 'Mật khẩu hiện tại là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' }),
            new_password: z.string().min(1, { message: 'Mật khẩu là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' }),
            new_confirm_password: z.string().min(1, { message: 'Xác thực mật khẩu là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' }),
      })
      .refine((form) => form.new_password === form.new_confirm_password, {
            message: 'Mật khẩu không khớp',
            path: ['new_confirm_password'],
      })

type TRegisterZodSchema = z.infer<typeof updatePasswordSchema>
const defaultValues: TRegisterZodSchema = {
      password: '',
      new_password: '',
      new_confirm_password: '',
}

const CustomerUpdatePassword = () => {
      const [showPassword, setShowPassword] = useState<'text' | 'password'>('password')
      const [showNewPassword, setShowNewPassword] = useState<'text' | 'password'>('password')
      const [showNewConfirmPassword, setShowNewConfirmPassword] = useState<'text' | 'password'>('password')

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm({
            defaultValues,
            resolver: zodResolver(updatePasswordSchema),
      })

      const handleShowHidePassword = (type: 'text' | 'password', setType: React.Dispatch<SetStateAction<'text' | 'password'>>) => {
            if (type === 'password') {
                  setType('text')
                  return
            } else {
                  setType('password')
            }
      }

      return (
            <div className='w-full h-[360px] flex items-center justify-center py-[12px]'>
                  <form className='w-[400px] px-[15px] pt-[15px] gap-[6%] h-full border-[1px] border-stone-200 rounded-md'>
                        <div className='h-[25%] flex flex-col gap-[4px]'>
                              <label htmlFor='password'>Mật khẩu hiện tại</label>
                              <div className='flex justify-between  border-[1px] border-stone-200 rounded-sm items-center px-[16px] py-[6px]'>
                                    <input
                                          {...register('password')}
                                          type={showPassword}
                                          id='password'
                                          className='w-[90%] border-none p-[0px]'
                                          placeholder='Nhập mật khẩu hiện tại'
                                    />
                                    <div
                                          className='icon w-[15px] h-[15px]'
                                          onClick={() => handleShowHidePassword(showPassword, setShowPassword)}
                                    >
                                          {showPassword === 'text' ? (
                                                <EyeOff size={'20px'} color={errors.password ? 'red' : 'black'} />
                                          ) : (
                                                <Eye size={'20px'} color={errors.password ? 'red' : 'black'} />
                                          )}
                                    </div>
                              </div>
                        </div>

                        <div className='h-[30%] flex flex-col gap-[4px]'>
                              <label htmlFor='new_password'>Nhập mật khẩu mới</label>
                              <div className='flex justify-between  border-[1px] border-stone-200 rounded-sm items-center px-[16px] py-[6px]'>
                                    <input
                                          {...register('new_password')}
                                          type={showNewPassword}
                                          id='new_password'
                                          className='w-[90%] border-none p-[0px]'
                                          placeholder='Nhập mật khẩu mới'
                                    />
                                    <div
                                          className='icon w-[15px] h-[15px]'
                                          onClick={() => {
                                                handleShowHidePassword(showNewPassword, setShowNewPassword)
                                          }}
                                    >
                                          {showNewPassword === 'text' ? (
                                                <EyeOff size={'20px'} color={errors.new_confirm_password ? 'red' : 'black'} />
                                          ) : (
                                                <Eye size={'20px'} color={errors.new_password ? 'red' : 'black'} />
                                          )}
                                    </div>
                              </div>
                              <span className='text-[11px] text-stone-600'>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</span>
                        </div>

                        <div className='h-[25%] flex flex-col gap-[4px]'>
                              <label htmlFor='confirm_password'>Nhập lại mật khẩu mới</label>
                              <div className='flex justify-between  border-[1px] border-stone-200 rounded-sm items-center px-[16px] py-[6px]'>
                                    <input
                                          {...register('new_confirm_password')}
                                          type={showNewConfirmPassword}
                                          id='confirm_password'
                                          className='w-[90%] border-none p-[0px]'
                                          placeholder='Nhập lại mật khẩu mới'
                                    />
                                    <div
                                          className='icon w-[15px] h-[15px'
                                          onClick={() => handleShowHidePassword(showNewConfirmPassword, setShowNewConfirmPassword)}
                                    >
                                          {showNewConfirmPassword === 'text' ? (
                                                <EyeOff size={'20px'} color={errors.new_confirm_password ? 'red' : 'black'} />
                                          ) : (
                                                <Eye size={'20px'} color={errors.new_confirm_password ? 'red' : 'black'} />
                                          )}
                                    </div>
                              </div>
                        </div>
                        <div className='h-[15%] w-full rounded-lg'>
                              <button className='w-full bg-stone-200 text-[rgba(0,0,0,.2)] rounded-[4px]  p-[8px]' type='submit'>
                                    Lưu thay đổi
                              </button>
                        </div>
                  </form>
            </div>
      )
}

export default CustomerUpdatePassword
