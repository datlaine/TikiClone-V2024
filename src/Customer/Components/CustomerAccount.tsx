import React, { useEffect, useRef, useState } from 'react'

//@Components
import Portal from '../../component/Portal'
import ModelCustomerAvatar from './models/ModelAvatarSee'
import ModelAvatarUpdate from './models/ModelAvatarUpdate'
import ModelAvatarDelete from './models/ModelAvatarDelete'
import CustomerAccountBirth from './form/CustomerAccountBirth'
import CustomerAccountGender from './form/CustomerAccountGender'
import { Link, useNavigate } from 'react-router-dom'

//@react-hook-form
import { useForm, FormProvider } from 'react-hook-form'

//@redux-toolkit
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { getInfoUser } from '../../Redux/authenticationSlice'

//@auth - api
import Account from '../../apis/account.api'

//@tanstack query
import { useMutation } from '@tanstack/react-query'

//@toast - notification
import BoxToast from '../../component/ui/BoxToast'
import { checkAxiosError } from '../../utils/handleAxiosError'
import { sleep } from '../../utils/sleep'

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

type TErrorAxios = {
      code: number
      detail: string
      message: string
} | null

//@component
const CustomerAccount = () => {
      const user = useSelector((state: RootState) => state.authentication.user)
      const [modelAvatar, setModelAvatar] = useState(false)
      const [modelAvatarSee, setmodelAvatarSee] = useState(false)
      const [modelAvatarUpdate, setModelAvatarUpdate] = useState(false)
      const [modelAvatarDelete, setModelAvatarDelete] = useState(false)
      const [fileAvatar, setFileAvatar] = useState<File>()
      const [filePreview, setFilePreview] = useState<string | undefined>()
      const refModelAvatar = useRef<HTMLDivElement>(null)
      const [toast, setShowToast] = useState(false)
      const dispatch = useDispatch()
      const methods = useForm<TFormCustomer>({
            defaultValues: {
                  fullName: `${user.fullName || user?.email?.split('@')[0]}`,
                  nickName: `${user.nickName || '@' + user.email.split('@')[0] || 'none'}`,
                  birth: {
                        day: `${new Date(`${user.bob}`).getDate() || 'Ngày'} `,
                        month: `${new Date(`${user.bob}`).getMonth() + 1 || 'Tháng'} `,
                        year: `${new Date(`${user.bob}`).getFullYear() || 'Năm'} `,
                  },
                  gender: `${user.gender}`,
            },
      })

      const getMe = useMutation({
            mutationKey: ['getMe'],
            mutationFn: () => Account.getMe(),
            onSuccess: (data: any) => console.log('me', data),
      })

      const updateInfo = useMutation({
            mutationKey: ['update-info'],
            mutationFn: (data: any) => Account.updateInfo(data),
            onSuccess: async (data: any) => {
                  // console.log('dispatch', { data })
                  dispatch(getInfoUser(data.data.metadata.user))
            },

            onError: async (error) => {
                  //error.response.data.error
                  if (checkAxiosError<TErrorAxios>(error)) {
                        if (error.response?.data?.code === 403 && error.response.data.message === 'Forbidden') {
                              setShowToast(true)
                              await sleep(3000)
                              window.location.reload()
                        }
                  }
                  // if (error.response.status === 403 && error.response.statusText === 'Forbidden') console.log(error)
            },
      })
      useEffect(() => {
            const handleEvent = (e: MouseEvent) => {
                  // khong click vao thi chay dong script nay
                  if (!refModelAvatar.current?.contains(e.target as Node)) {
                        // console.log('click point', e.target, modelAvatar)
                        if (refModelAvatar.current) {
                              // console.log(1)
                              setModelAvatar((prev) => !prev)
                        }
                  }
            }

            document.addEventListener('click', handleEvent)

            return () => document.removeEventListener('click', handleEvent)
      }, [])

      const handleGetMe = () => {
            getMe.mutate()
      }

      useEffect(() => {
            if (!fileAvatar) {
                  setFilePreview(undefined)
                  return
            }

            const objectUrl = URL.createObjectURL(fileAvatar)
            setFilePreview(objectUrl)
            console.log(objectUrl)
            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl)
      }, [fileAvatar])

      const handleControllmodelAvatarSee = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            e.stopPropagation()
            setmodelAvatarSee((prev) => !prev)
      }

      const handleControllmodelAvatarUpdate = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            e.stopPropagation()
            setModelAvatarUpdate((prev) => !prev)
      }

      const handleControllmodelAvatarDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            e.stopPropagation()
            setModelAvatarDelete((prev) => !prev)
      }

      const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (filePreview || fileAvatar) {
                  setFilePreview(undefined)
                  setFileAvatar(undefined)
            }

            console.log(e.target.files)
            if (e.target.files) {
                  setFileAvatar(e.target.files[0])
            }
      }

      //submid update info account
      const onSubmit = (form: TFormCustomer) => {
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
            // console.log('form-clear', new Date(+data.birth.year, +data.birth.month + 1, +data.birth.day))
      }
      return (
            <div className='flex flex-col lg:flex-row min-h-full h-auto gap-[20px] xl:gap-[2%]'>
                  {toast && <BoxToast message={'Phien dang nhap het han, vui long xac thuc lai sau 3s'} children={<p>OK</p>} />}

                  <FormProvider {...methods}>
                        <form className='w-full xl:w-[59%] h-auto flex flex-col gap-[16px]' onSubmit={methods.handleSubmit(onSubmit)}>
                              <h3 className='h-[10%]'>Thông tin cá nhân</h3>
                              <div className='h-[35%] xl:h-[20%] data-user flex flex-col xl:flex-row gap-[20px] xl:gap-0 xl:items-center'>
                                    <div
                                          className=' flex self-center items-center justify-center h-[60px] w-[60px] xl:h-[80px] xl:w-[80px] rounded-full bg-blue-300 relative'
                                          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                                e.stopPropagation()
                                                setModelAvatar((prev) => !prev)
                                          }}
                                    >
                                          <img src={user.sercel_url || ''} alt='user_avatar' className='w-full h-full rounded-full' />
                                          {modelAvatar && (
                                                <>
                                                      <div
                                                            className='absolute top-[70%]  shadow-xl border-[1px] border-stone-300 bg-white rounded-md w-[250px] h-[150px] max-h-auto '
                                                            ref={refModelAvatar}
                                                      >
                                                            <div className='relative'>
                                                                  <span className='clip-path-modelAvatar absolute w-[20px] h-[13.5px] border-[1px] border-stone-300 border-b-0  bg-white top-[-13px] left-[50%] translate-x-[-50%]'></span>
                                                                  <ul className='h-full'>
                                                                        <li
                                                                              className='flex items-center w-full h-[50px] px-[20px] hover:bg-sky-100'
                                                                              onClick={handleControllmodelAvatarSee}
                                                                        >
                                                                              {/* <img src='' alt='' /> */}
                                                                              <div className='bg-red-500 w-[15px] h-[15px] mr-[12px] rounded'></div>
                                                                              <span>Xem ảnh đại diện</span>
                                                                        </li>
                                                                        {modelAvatarSee && (
                                                                              <Portal>
                                                                                    <ModelCustomerAvatar
                                                                                          setModelAvatarSee={setmodelAvatarSee}
                                                                                          setModelAvatar={setModelAvatar}
                                                                                          children={
                                                                                                <img
                                                                                                      src={user.sercel_url}
                                                                                                      alt='user_avatar'
                                                                                                      className='w-[150px] h-full rounded-full'
                                                                                                />
                                                                                          }
                                                                                    />
                                                                              </Portal>
                                                                        )}
                                                                        <li
                                                                              className='flex items-center w-full h-[50px] px-[20px] hover:bg-sky-100'
                                                                              onClick={handleControllmodelAvatarUpdate}
                                                                        >
                                                                              {/* <img src='' alt='' /> */}
                                                                              <div className='bg-blue-500 w-[15px] h-[15px] mr-[12px] rounded'></div>

                                                                              <span>Cập nhập ảnh đại diện</span>
                                                                        </li>

                                                                        {modelAvatarUpdate && (
                                                                              <Portal>
                                                                                    <ModelAvatarUpdate
                                                                                          setModelAvatar={setModelAvatar}
                                                                                          setModelAvatarUpdate={setModelAvatarUpdate}
                                                                                          filePreview={filePreview}
                                                                                          setFilePreview={setFilePreview}
                                                                                          setFileAvatar={setFileAvatar}
                                                                                          handleUploadAvatar={handleUploadAvatar}
                                                                                    />
                                                                              </Portal>
                                                                        )}
                                                                        <li
                                                                              className='flex items-center w-full h-[50px] px-[20px] hover:bg-sky-100 '
                                                                              onClick={handleControllmodelAvatarDelete}
                                                                        >
                                                                              {/* <img src='' alt='' /> */}
                                                                              <div className='bg-yellow-500 w-[15px] h-[15px] mr-[12px] rounded'></div>
                                                                              <span>Xóa ảnh đại diện</span>
                                                                        </li>

                                                                        {modelAvatarDelete && (
                                                                              <Portal>
                                                                                    <ModelAvatarDelete
                                                                                          setModelAvatar={setModelAvatar}
                                                                                          setModelAvatarDelete={setModelAvatarDelete}
                                                                                    />
                                                                              </Portal>
                                                                        )}
                                                                  </ul>
                                                            </div>
                                                      </div>
                                                </>
                                          )}
                                    </div>
                                    <div className='flex flex-1  flex-col justify-between gap-4'>
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
                              <div className='form_user w-full h-[50%] mt-[30px] flex gap-[10%]'>
                                    <div className='flex flex-col w-full gap-[25px] lg:pt-[35px] 2xl:pt-[10px]'>
                                          <div className='label w-full flex flex-col 2xl:flex-row  gap-[10px] lg:gap-[25px] 2xl:gap-[0px]  sm:items-start  2xl:items-center  '>
                                                <span className='w-[80px]'>Ngày sinh</span>
                                                <CustomerAccountBirth />
                                          </div>

                                          <div className='label flex flex-col lg:flex-row gap-[10px] lg:gap-[25px] 2xl:gap-0    items-start  xl:items-center '>
                                                <span className='w-[80px]'>Giới tính</span>
                                                <CustomerAccountGender />
                                          </div>

                                          <button
                                                className='flex items-center justify-center gap-[6px] ml-0 2xl:ml-[250px] w-[160px] h-[20px] p-[20px] bg-blue-700 text-white rounded-md'
                                                type='submit'
                                          >
                                                <span>Lưu thay đổi</span>
                                                {!toast && updateInfo.isLoading && (
                                                      <span
                                                            className='inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                                            role='status'
                                                      ></span>
                                                )}{' '}
                                          </button>
                                          {updateInfo.isSuccess && <BoxToast message={'Cập nhập thành công'} children={<p>OK</p>} />}
                                    </div>
                              </div>
                        </form>
                  </FormProvider>
                  {/* <br /> */}
                  <div className='w-[1px] min-h-full bg-slate-200'></div>
                  <div className='w-full xl:w-[39%] min-h-full '>
                        <div className='flex flex-col gap-[1px]'>
                              <span>Email & liên hệ</span>
                              <div className='flex justify-between items-center min-h-[90px] pb-[15px] '>
                                    <div className='w-[70%] flex flex-col items-center'>
                                          <div className=''>Địa chỉ email</div>
                                          <span className='block w-[250px] truncate'>{user.email}sdsdsadsds</span>
                                    </div>
                                    <Link
                                          to={'/customer/account/edit/email'}
                                          className='rounded-md bg-white border-[1px] border-blue-700 text-blue-700 h-[15%] px-[6px] py-[2px] '
                                    >
                                          Cập nhập
                                    </Link>
                              </div>
                        </div>

                        <div className='flex flex-col gap-[1px]'>
                              <span>Bảo mật</span>
                              <div className='flex justify-between items-center min-h-[90px] pb-[15px] '>
                                    <div>
                                          <div className=''>Đổi mật khẩu</div>
                                    </div>
                                    <Link
                                          to={'/customer/account/edit/pass'}
                                          className='rounded-md bg-white border-[1px] border-blue-700 text-blue-700 h-[15%] px-[6px] py-[2px] '
                                    >
                                          Cập nhập
                                    </Link>
                              </div>

                              <button className='bg-slate-900 text-white' onClick={handleGetMe}>
                                    Get me{' '}
                              </button>
                        </div>
                  </div>
            </div>
      )
}

export default CustomerAccount
