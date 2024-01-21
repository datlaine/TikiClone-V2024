import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Account from '../../../apis/account.api'
import { TAvatarActions } from '../../../reducer/customer.reducer'
import { checkAxiosError } from '../../../utils/handleAxiosError'
import BoxToast from '../../../component/ui/BoxToast'
import { sleep } from '../../../utils/sleep'
import TErrorAxios from '../../../types/axios.response.error'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

//@props
type TProps = {
      setModelAvatarUpdate?: React.Dispatch<SetStateAction<boolean>>
      setModelAvatar?: React.Dispatch<SetStateAction<boolean>>
      modeDispatch: React.Dispatch<TAvatarActions>
}

type TForm = {
      file: any
}

//@component::api
const ModelAvatarUpdate = (props: TProps) => {
      //@props
      const { modeDispatch } = props
      const methods = useForm<TForm>({
            defaultValues: { file: null },
      })
      const [toast, setShowToast] = useState(false)
      const user = useSelector((state: RootState) => state.authentication.user)
      const updateAvatarResponse = useMutation({
            mutationKey: ['update-avatar'],
            mutationFn: (data: any) => Account.updateAvatar(data),
            onSuccess: (res: any) => console.log('update avatar response', res),
            onError: async (error) => {
                  //@[shape] :: error.response.data.error
                  if (checkAxiosError<TErrorAxios>(error)) {
                        if (
                              error.response?.status === 403 &&
                              error.response?.statusText === 'Forbidden' &&
                              error.response?.data?.detail === 'Login again'
                        ) {
                              setShowToast(true)
                              // localStorage.removeItem('user')
                              // localStorage.removeItem('token')
                              await sleep(2000)
                              // window.location.reload()
                        }
                  }
            },
      })

      const [fileAvatar, setFileAvatar] = useState<File>()
      const [filePreview, setFilePreview] = useState<string | undefined>()

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

      //@closeModel
      const modelControllClose = () => {
            setFileAvatar(undefined)
            modeDispatch({ type: 'CLOSE_MODE_AVATAR_UPDATE', payload: { modeAvatarUpdate: false, boxModeAvatar: false } })

            if (filePreview) URL.revokeObjectURL(filePreview)
            setFilePreview('')
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

      const onSubmit: SubmitHandler<TForm> = (file) => {
            console.log(file, fileAvatar)
            // console.log('link', URL.createObjectURL(file.file[0].name))
            const formData: any = new FormData()
            formData.append('file', fileAvatar)
            formData.append('user', user)

            console.log('dirty', methods)
            updateAvatarResponse.mutate(formData)
      }

      //@element
      return (
            <div
                  className='fixed top-0 left-0 mx-[25px] lg:mx-0 bg-[rgba(0,0,0,.7)] w-full min-h-screen z-[500] flex items-center justify-center'
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            >
                  {toast && <BoxToast message={'Phien dang nhap het han, vui long xac thuc lai sau 3s'} children={<p>OK</p>} />}

                  <div className={`w-[650px] ${filePreview ? 'h-[450px]' : 'h-[740px]'} bg-white rounded-2xl p-[40px] relative`}>
                        <div className='text-[25px] absolute top-[25px] right-[25px]' onClick={modelControllClose}>
                              <X />
                        </div>
                        <div className='h-[10%] flex items-center mb-[15px]'>Cập nhập ảnh đại diện</div>
                        <div className='h-[1px] bg-stone-100'></div>
                        <form
                              className='h-[85%]'
                              onSubmit={(e) => {
                                    e.stopPropagation()

                                    return methods.handleSubmit(onSubmit)(e)
                              }}
                        >
                              <div
                                    className={`flex ${
                                          filePreview ? 'h-[calc(90%-32px)]' : 'justify-center h-[calc(100%-85px)]'
                                    } mt-[25px] bg-stone-100 mb-[25px] p-[20px] `}
                              >
                                    {filePreview && (
                                          <img src={filePreview} width={200} height={200} alt='avatar_update' className='order-1 w-[50%]' />
                                    )}
                                    <label
                                          htmlFor='avatar_update'
                                          className={`${
                                                filePreview ? 'text-center order-2 w-[50%]' : 'w-full'
                                          }  h-full border-[2px] border-dashed border-slate-700 flex justify-center items-center text-blue-500`}
                                    >
                                          {filePreview ? 'Chọn ảnh khác' : 'Nhấn để chọn hoặc kéo thả hình ảnh vào khung này'}
                                    </label>
                                    <Controller
                                          name='file'
                                          control={methods.control}
                                          render={({ field }) => (
                                                <input
                                                      type='file'
                                                      id='avatar_update'
                                                      onChange={(event) => {
                                                            handleUploadAvatar(event)
                                                            field.onChange(event)
                                                      }}
                                                      hidden
                                                />
                                          )}
                                    />
                              </div>

                              {filePreview && (
                                    <div className='w-full min-w-[100px] flex gap-[2%]'>
                                          <button
                                                className='w-[49%] px-[12px] py-[6px] bg-stone-200 text-blue-500'
                                                onClick={modelControllClose}
                                          >
                                                Hủy bỏ
                                          </button>
                                          <button type='submit' className='w-[49%] px-[12px] py-[6px] bg-blue-500 text-white'>
                                                Lưu thay đổi
                                          </button>
                                    </div>
                              )}
                        </form>
                  </div>
            </div>
      )
}

export default ModelAvatarUpdate
