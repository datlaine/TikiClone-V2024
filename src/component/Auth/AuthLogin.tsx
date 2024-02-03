import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { TModeAuth } from './AuthWrapper'
import { Eye, EyeOff, ShieldX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Auth from '../../apis/auth.api'
import { useDispatch } from 'react-redux'
import { checkAxiosError } from '../../utils/handleAxiosError'
import TErrorAxios from '../../types/axios.response.error'
import BoxToast from '../ui/BoxToast'
import { debounce } from 'lodash'
import { fetchUser } from '../../Redux/authenticationSlice'

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

type TloginZodSchema = z.infer<typeof loginSchema>

const AuthLogin = (props: TProps) => {
    //Mode Login | register
    const { setModeAuth } = props
    const [toast, setShowToast] = useState(false)
    const countRef = useRef(0)
    //state type password
    const [typePassword, setTypePassword] = useState<'password' | 'text'>('password')

    //react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TloginZodSchema>({
        defaultValues,
        resolver: zodResolver(loginSchema),
    })

    useEffect(() => {}, [])
    countRef.current += 1

    console.log({ count: countRef.current })
    const dispatch = useDispatch()

    const authLogin = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: TloginZodSchema) => Auth.login(data),
        onSuccess: (res) => {
            dispatch(fetchUser({ user: res.data.metadata.user, access_token: res.data.metadata.access_token as string }))
        },
        onError: async (error: unknown) => {
            //@[shape] :: error.response.data.error
            if (checkAxiosError<TErrorAxios>(error)) {
                if (
                    error?.response?.status === 404 &&
                    error?.response?.statusText === 'Not Found' &&
                    error?.response?.data?.detail === 'Not found Email'
                ) {
                    setShowToast(true)
                }
            }
        },
        retry: 1,
    })

    console.log({ toast })

    //change type passsword
    const handleShowHidePassword = () => {
        if (typePassword === 'password') {
            setTypePassword('text')
            return
        } else {
            setTypePassword('password')
        }
    }

    const onSubmit = debounce((form: TFormLogin) => {
        // console.log(form, errors)
        authLogin.mutate(form)
    }, 2500)

    return (
        <div className='flex flex-col items-center gap-[15px] py-[35px]'>
            {/* {toast && <BoxToast setShowToast={setShowToast} message={'Thông tin không hợp lệ'} children={<p>OK</p>} />} */}

            <h3 className={`${Object.keys(errors).length > 0 ? 'text-red-700' : 'text-slate-900'} font-black tracking-[5px] text-[24px]`}>
                Login
            </h3>
            <h4 className={`${Object.keys(errors).length > 0 ? 'text-red-700' : 'text-stone-600'} italic text-[16px] opacity-80 px-[12px]`}>
                Đăng nhập để trải nghiệm mua sắm thỏa thích
            </h4>
            <form className='flex flex-1 flex-col gap-[20px] mt-[12px] w-[70%]' noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full'>
                    <input
                        {...register('email')}
                        type='text'
                        className={`w-full border-[1px]  outline-none px-[12px] py-[4px] rounded-[3px] ${
                            errors.email
                                ? ' placeholder:text-red-700 placeholder:italic text-[12px] border-red-700'
                                : 'border-slate-900 placeholder:text-stone-500  '
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
                        className={`w-full border-[1px]  outline-none px-[12px] py-[4px] rounded-[3px] ${
                            errors.password
                                ? ' placeholder:text-red-700 placeholder:italic text-[12px] border-red-700'
                                : 'border-slate-900 placeholder:text-stone-500  '
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
                <div className=''>
                    <p>
                        Bạn chưa có tài khoản,{' '}
                        <span className='underline text-slate-900' onClick={() => setModeAuth('Register')}>
                            đăng kí nhé
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => console.log('click')}
                    type='submit'
                    className='flex justify-center items-center gap-[8px] w-full h-[60px] rounded-lg bg-slate-900 text-white disabled:bg-stone-400 disabled:cursor-not-allowed'
                    disabled={!authLogin.isPending && Object.keys(errors).length > 0}
                    title={Object.keys(errors).length > 0 ? 'Vui lòng nhập thông tin hợp lệ' : `Đăng nhập`}
                >
                    <span>Login</span>
                    {authLogin.isPending && (
                        <span
                            className=' inline-block h-[25px] w-[25px] text-[#ffffff] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                            role='status'
                        ></span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default AuthLogin
