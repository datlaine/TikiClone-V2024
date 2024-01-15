import React, { useEffect, useRef, useState } from 'react'
import Portal from '../../component/Portal'
import ModelCustomerAvatar from './models/ModelAvatarSee'
import ModelAvatarUpdate from './models/ModelAvatarUpdate'
import ModelAvatarDelete from './models/ModelAvatarDelete'
import CustomerAccountBirth from './form/CustomerAccountBirth'
import CustomerAccountGender, { TGender } from './form/CustomerAccountGender'
import { Link } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'

type TFormCustomer = {
      name: string
      nickname: string
      birth:
            | {
                    day: string
                    month: string
                    year: string
              }
            | string
      gender: string
}

const defaultValues: TFormCustomer = {
      name: 'Đạt lại',
      nickname: '',
      birth: {
            day: '30',
            month: '04',
            year: '2002',
      },
      gender: 'FEMALE',
}

const CustomerAccount = () => {
      const [modelAvatar, setModelAvatar] = useState(false)
      const [modelAvatarSee, setmodelAvatarSee] = useState(false)
      const [modelAvatarUpdate, setModelAvatarUpdate] = useState(false)
      const [modelAvatarDelete, setModelAvatarDelete] = useState(false)
      const [fileAvatar, setFileAvatar] = useState<File>()
      const [filePreview, setFilePreview] = useState<string | undefined>()
      const [formNestedBirth, setFormNestedBirth] = useState('')
      const [formNestedGender, setFormNestedGender] = useState<keyof TGender>('MALE')
      const refModelAvatar = useRef<HTMLDivElement>(null)
      const methods = useForm<TFormCustomer>({
            defaultValues,
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

      const onSubmit = (data: TFormCustomer) => {
            const finallyData = { ...data }
            console.log('form', finallyData)
            for (let a in finallyData) {
                  let bob = ''
                  if (!finallyData[a as keyof TFormCustomer]) delete finallyData[a as keyof TFormCustomer]
            }

            console.log('form-clear', finallyData)
      }
      return (
            <div className='flex flex-col lg:flex-row min-h-full h-auto gap-[20px] xl:gap-[2%]'>
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
                                          <span>Avatar </span>
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
                                                                                                <div className='flex justify-center mt-[25px]'>
                                                                                                      <div className='avatar bg-yellow-300 w-[150px] h-[150px] rounded-full'></div>
                                                                                                </div>
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
                                                      type='text'
                                                      id='form_name'
                                                      value={'Đạt Lại'}
                                                      className='px-[12px] py-[8px] w-[60%] border-stone-300'
                                                />
                                          </div>

                                          <div className='flex justify-between w-full h-[35%] pl-[15px] items-center text-[14px]'>
                                                <label htmlFor='form_nickname' className='w-[20%]'>
                                                      Nickname
                                                </label>
                                                <input
                                                      type='text'
                                                      id='form_nickname'
                                                      placeholder='Thêm nickname'
                                                      className='px-[12px] py-[8px] w-[60%] border-stone-300'
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

                                          <button className='flex items-center justify-center ml-0 2xl:ml-[250px] w-[160px] h-[20px] p-[20px] bg-blue-700 text-white rounded-md'>
                                                Lưu thay đổi
                                          </button>
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
                                    <div>
                                          <div className=''>Địa chỉ email</div>
                                          <span>datlai304@gmail.com</span>
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
                        </div>
                  </div>
            </div>
      )
}

export default CustomerAccount
