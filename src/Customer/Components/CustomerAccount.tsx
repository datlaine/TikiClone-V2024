import React, { useContext, useEffect, useId, useReducer, useRef, useState } from 'react'

//@react-router
import { Link } from 'react-router-dom'

//@react-hook-form
import { useForm, FormProvider } from 'react-hook-form'

//@tanstack query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

//@redux-toolkit
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '../../store'
import { doLogout, fetchUser } from '../../Redux/authenticationSlice'

//@components
import CustomerAccountBirth from './form/CustomerAccountBirth'
import CustomerAccountGender from './form/CustomerAccountGender'

//@auth - api
import Account from '../../apis/account.api'

//@toast - notification
import BoxToast from '../../component/ui/BoxToast'

//@utils
import { checkAxiosError } from '../../utils/handleAxiosError'
import { sleep } from '../../utils/sleep'

//@icon
import BoxAvatarMode from './Box/BoxAvatarMode'
import TErrorAxios from '../../types/axios.response.error'
import { ContextToast } from '../../component/Context/ToastContext'
import { addToast } from '../../Redux/toast'
import ToastDemo from '../../component/ui/ToastDemo'

//@type form
type TFormCustomer = {
    fullName: string
    nickName: string
    birth: {
        day: string
        month: string
        year: string
    }

    gender: string
}

//action

//@Component :: api
const CustomerAccount = () => {
    const user = useSelector((state: RootState) => state.authentication.user)
    const toast = useSelector((state: RootState) => state.toast.toast)
    // const [toast, setShowToast] = useState(false)
    const { setShowToast, showToast, setContentToast, contentToast } = useContext(ContextToast)
    const count = useRef<number>(0)
    const dispatch = useDispatch()
    // console.log({ id: Math.random() })
    const methods = useForm<TFormCustomer>({
        defaultValues: {
            fullName: `${user.fullName || user?.email?.split('@')[0]}`,
            nickName: `${user.nickName || '@' + user.email.split('@')[0] || 'none'}`,
            birth: {
                day: `${new Date(`${user.bob}`).getDate() || 'Ngày'} `,
                month: `${new Date(`${user.bob}`).getMonth() + 1 || 'Tháng'} `,
                year: `${new Date(`${user.bob}`).getFullYear() || 'Năm'} `,
            },
            gender: `${user.gender}` || 'Male',
        },
    })

    const getMe = useMutation({
        mutationKey: ['getMe'],
        mutationFn: async () => {
            await Account.getMe()
        },
        onError: async (error: unknown) => {
            if (checkAxiosError<TErrorAxios>(error)) {
                if (
                    error.response?.status === 403 &&
                    error.response.statusText === 'Forbidden' &&
                    error.response.data?.detail === 'Refresh failed'
                )
                    setContentToast((prev) => [
                        ...prev,
                        { type: 'ERROR', message: 'Refresh token khong ton tai', id: Math.random().toString() },
                    ])
                await sleep(3000)
                window.location.reload()
            }
        },
    })

    const updateInfo = useMutation({
        mutationKey: ['update-info'],
        mutationFn: (data: any) => Account.updateInfo(data),
        onSuccess: async (data: any) => {
            // console.log('dispatch', { data })
            dispatch(fetchUser({ user: data.data.metadata.user }))
            // setShowToast((prev) => !prev)
            dispatch(addToast({ type: 'SUCCESS', message: 'Cap nhap success', id: Math.random().toString() }))
        },

        onError: async (error) => {
            //@[shape] :: error.response.data.error
            if (checkAxiosError<TErrorAxios>(error)) {
                if (error.response?.data?.code === 403 && error.response.data.message === 'Forbidden') {
                    // setShowToast(true)
                    await sleep(2000)
                    window.location.reload()
                }

                if (error.response?.data?.code === 400 && error.response.data.message === 'Bad Request') {
                    // setShowToast(true)
                    await sleep(2000)
                    window.location.reload()
                }
            }
        },
    })

    const handleGetMe = async () => {
        getMe.mutate()
    }

    //@[shape] :: error.response.data.error

    const submitfake = (data: TFormCustomer) => {
        console.log('event', data)
    }

    //submid update info account
    const onSubmit = (form: TFormCustomer) => {
        console.log({ submid: form })
        //Có 2 trường hợp sẽ xảy ra liên quan đến bob
        // thứ nhất theo mặc định sẽ là 'Ngày' 'Tháng' 'Năm' nếu người dùng không tương tác với field này thì ta sẽ gán cho nó = null
        // còn ngược lại thì ghép 3 chuỗi vừa nhận được từ hàm vaild kia để tạo ra 1 ngày hoàn chỉnh rồi gửi lên server
        // Tháng sẽ bằng giá trị tháng hiện có -1 vì mảng tháng bắt đầu = 0
        // Còn vì sao phải chia bob thành 3 field khác nhau vì ta cho chọn select riêng lẻ
        let newBirth: null | Date
        if (form.birth.day === 'Ngày' && form.birth.month === 'Tháng' && form.birth.year) {
            newBirth = null
        } else {
            newBirth = new Date(+form.birth.year, Number(form.birth.month) - 1, +form.birth.day)
        }
        updateInfo.mutate({
            ...form,
            birth: newBirth,
            nickName: form.nickName ? form.nickName : null,
            fullName: form.fullName ? form.fullName : null,
        })
    }
    useEffect(() => {
        if (getMe.isSuccess) {
            // dispatch(fetchUser({ user: getMe.data }))
            dispatch(
                addToast({
                    type: 'SUCCESS',
                    message: `Lấy thông tin thành công`,
                    id: Math.random().toString(),
                }),
            )
        }
    }, [getMe.isSuccess, dispatch])

    return (
        <div className='flex flex-col lg:flex-row min-h-[500px] h-auto gap-[20px] xl:gap-[2%]'>
            {/* {toast && <BoxToast message={'Phien dang nhap het han, vui long xac thuc lai sau 3s'} children={<p>OK</p>} />} */}

            <FormProvider {...methods}>
                <form className='w-full xl:w-[59%] h-auto flex flex-col gap-[12px]' onSubmit={methods.handleSubmit(onSubmit)}>
                    {/* @header */}
                    <h3 className='h-[45px]'>Thông tin cá nhân</h3>

                    {/* @change mode with avatar */}
                    <div className='h-[45%] xl:h-[20%] data-user flex flex-col xl:flex-row gap-[20px] xl:gap-0 xl:items-center'>
                        {/* @onClick active mode*/}
                        <BoxAvatarMode />
                        {/* @ form update infomation account */}
                        {/* @ formLayout - 1 */}
                        <div className='flex flex-1  flex-col justify-between gap-4'>
                            {/* @ field::name -> fullname */}
                            <div className='flex justify-between w-full h-[35%] pl-[15px] items-center text-[14px]'>
                                <label htmlFor='form_name' className='w-[20%]'>
                                    Họ & tên
                                </label>
                                <input
                                    {...methods.register('fullName')}
                                    type='text'
                                    id='form_name'
                                    defaultValue={methods.getValues('fullName')}
                                    className='px-[12px] py-[8px] w-[60%] border-stone-300'
                                />
                            </div>
                            {/* @ field::name -> nickname */}
                            <div className='flex justify-between w-full h-[35%] pl-[15px] items-center text-[14px]'>
                                <label htmlFor='form_nickname' className='w-[20%]'>
                                    Nickname
                                </label>
                                <input
                                    {...methods.register('nickName')}
                                    placeholder={methods.getValues('nickName')}
                                    type='text'
                                    id='form_nickname'
                                    className={`italic ${
                                        methods.formState.isDirty ? 'text-slate-900' : 'text-stone-300'
                                    } px-[12px] py-[8px] w-[60%] border-stone-300`}
                                />
                            </div>
                        </div>
                    </div>
                    {/* @ formLayout - 2 */}
                    <div className='form_user w-full min-h-[50%] sm:min-h-[40%] h-auto flex gap-[4%] mt-[16px] xl:mt-0'>
                        <div className='flex flex-col w-full gap-[16px] lg:pt-[15px] 2xl:pt-[10px]'>
                            {/* @ field::bob */}
                            <div className='flex flex-col sm:flex-row justify-between w-full h-[30%] sm:h-[20%] pl-[15px] sm:items-center text-[14px] gap-[20px]'>
                                <span className='w-[80px]'>Ngày sinh</span>
                                <CustomerAccountBirth />
                            </div>
                            {/* @ field::gender */}
                            <div className='flex flex-col sm:flex-row justify-between w-full h-[20%] pl-[15px] sm:items-center text-[14px] gap-[20px]'>
                                <span className='w-[80px]'>Giới tính</span>
                                <CustomerAccountGender />
                            </div>
                            {/* @ form::action -> submit */}
                            <div className='w-full mt-[50px] sm:mt-0 pl:[35px] sm:pl-[115px]'>
                                <button
                                    disabled={updateInfo.isPending}
                                    className='flex items-center justify-center gap-[6px] ml-0  w-[160px] h-[20px] p-[20px] bg-blue-700 text-white rounded-md'
                                    type='submit'
                                >
                                    <span>Lưu thay đổi</span>
                                    {/* @ form::action -> boolean submit */}
                                    {/* {!toast && updateInfo.isLoading && (
                                                            <span
                                                                  className='inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                                                  role='status'
                                                            ></span>
                                                      )}{' '} */}
                                </button>
                            </div>

                            {/* @ form::action -> toast */}
                            {/* {updateInfo.isSuccess && <BoxToast message={'Cập nhập thành công'} children={<p>OK</p>} />} */}
                        </div>
                    </div>
                </form>
            </FormProvider>
            {/* Right */}
            <div className='w-[1px] min-h-full bg-slate-200'></div>
            <div className='w-full xl:w-[45%] min-h-full '>
                {/* @customer::account -> update::email */}
                <div className='flex flex-col gap-[1px]'>
                    <span>Email & liên hệ</span>
                    <div className='flex flex-col 2xl:flex-row justify-between 2xl:items-center min-h-[90px] pb-[15px] gap-[15px] 2xl:gap-0 '>
                        <div className='w-full sm:w-[70%] flex flex-col justify-center'>
                            <div className=''>Địa chỉ email</div>
                            <span className='block w-[250px] truncate'>{user.email}</span>
                        </div>
                        <Link
                            to={'/customer/account/update/email'}
                            className='w-[150px] sm:w-[90px] flex items-center justify-center rounded-md bg-white border-[1px] border-blue-700 text-blue-700 h-[15%] px-[6px] py-[2px] '
                        >
                            Cập nhập
                        </Link>
                    </div>
                </div>
                {/* @customer::account -> update::password */}
                <div className='flex flex-col gap-[1px]'>
                    <span>Bảo mật</span>
                    <div className='flex flex-col 2xl:flex-row justify-between 2xl:items-center min-h-[90px] pb-[15px] gap-[15px] 2xl:gap-0'>
                        <div>
                            <div className=''>Đổi mật khẩu</div>
                        </div>
                        <Link
                            to={'/customer/account/update/password'}
                            className='w-[150px] sm:w-[90px] flex items-center justify-center rounded-md bg-white border-[1px] border-blue-700 text-blue-700 h-[15%] px-[6px] py-[2px] '
                        >
                            Cập nhập
                        </Link>
                    </div>

                    <button className='bg-slate-900 text-white' onClick={handleGetMe}>
                        Get me{' '}
                    </button>

                    <button
                        className='bg-slate-900 text-white'
                        onClick={() => store.dispatch(addToast({ type: 'SUCCESS', message: 'Add', id: Math.random().toString() }))}
                    >
                        Add toast{' '}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerAccount
