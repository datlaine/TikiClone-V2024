import React, { ElementRef, useEffect, useRef, useState } from 'react'
import Portal from '../../component/Portal'
import ModelCustomerAvatar from './models/ModelCustomerAvatar'

const CustomerAccount = () => {
      const [modelAvatar, setModelAvatar] = useState(false)
      const [modelAvatarSee, setmodelAvatarSee] = useState(false)
      const [modelAvatarUpdate, setModelAvatarUpdate] = useState(false)
      const [fileAvatar, setFileAvatar] = useState<File>()
      const [filePreview, setFilePreview] = useState<string | undefined>()
      const refModelAvatar = useRef<HTMLDivElement>(null)

      useEffect(() => {
            const handleEvent = (e: MouseEvent) => {
                  // khong click vao thi chay dong script nay
                  if (!refModelAvatar.current?.contains(e.target as Node)) {
                        console.log('click point', e.target, modelAvatar)
                        if (refModelAvatar.current) {
                              console.log(1)
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

      const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.files)
            if (e.target.files) {
                  setFileAvatar(e.target.files[0])
            }
      }
      return (
            <div className='flex min-h-full gap-[2%]'>
                  <div className='w-[59%] min-h-full flex flex-col gap-[4px]'>
                        <h3 className='h-[10%]'>Thông tin cá nhân</h3>
                        <div className='h-[20%] data-user flex  '>
                              <div
                                    className=' flex items-center justify-center h-[120px] w-[120px] rounded-full bg-blue-300 relative'
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
                                                            <span className='clip-path-modelAvatar absolute w-[20px] h-[13.5px] border-[1px] border-stone-300 border-b-0 z-[2] bg-white top-[-13px] left-[50%] translate-x-[-50%]'></span>
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
                                                                              <ModelCustomerAvatar
                                                                                    setModelAvatar={setModelAvatar}
                                                                                    setModelAvatarUpdate={setModelAvatarUpdate}
                                                                                    children={
                                                                                          <div className='flex justify-center mt-[25px] bg-stone-100 mb-[25px] p-[20px] h-[calc(100%-85px)]'>
                                                                                                <label
                                                                                                      htmlFor='avatar_update'
                                                                                                      className='w-full h-full border-[2px] border-dashed border-slate-700 flex justify-center items-center text-blue-500'
                                                                                                >
                                                                                                      Nhấn để chọn hoặc kéo thả hình ảnh vào
                                                                                                      khung này
                                                                                                </label>
                                                                                                <input
                                                                                                      type='file'
                                                                                                      id='avatar_update'
                                                                                                      hidden
                                                                                                      onChange={handleUploadAvatar}
                                                                                                />
                                                                                                {filePreview && (
                                                                                                      <img
                                                                                                            src={filePreview}
                                                                                                            width={200}
                                                                                                            height={200}
                                                                                                            alt=''
                                                                                                      />
                                                                                                )}
                                                                                          </div>
                                                                                    }
                                                                              />
                                                                        </Portal>
                                                                  )}
                                                                  <li
                                                                        className='flex items-center w-full h-[50px] px-[20px] hover:bg-sky-100 '
                                                                        onClick={(e) => e.stopPropagation()}
                                                                  >
                                                                        {/* <img src='' alt='' /> */}
                                                                        <div className='bg-yellow-500 w-[15px] h-[15px] mr-[12px] rounded'></div>
                                                                        <span>Xóa ảnh đại diện</span>
                                                                  </li>
                                                            </ul>
                                                      </div>
                                                </div>
                                          </>
                                    )}
                              </div>
                              <div className='flex flex-1  flex-col justify-between'>
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
                  </div>
                  {/* <br /> */}
                  <div className='w-[1px] min-h-full bg-slate-200'>line</div>
                  <div className='w-[39%] min-h-full '>contact</div>
            </div>
      )
}

export default CustomerAccount
