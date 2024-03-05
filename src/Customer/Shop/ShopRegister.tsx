import React, { useEffect, useRef, useState } from 'react'
import InputText from '../Sell/components/InputText'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import BoxModalPreview from '../../component/BoxUi/BoxModalPreview'
import { useMutation } from '@tanstack/react-query'
import ShopApi, { IUploadImageAvatar, TShopAvatarReturn } from '../../apis/shop.api'
import { useDispatch, useSelector } from 'react-redux'
import { addToast } from '../../Redux/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { fetchUser } from '../../Redux/authenticationSlice'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'

/**
 *  form [shop_name, shop_image?:]
 *
 */

export type TFormRegisterShop = {
      shop_name: string
}

const schema = z.object({
      shop_name: z.string().min(1, 'Tên của hàng là bắt buộc'),
})

const ShopRegister = () => {
      const registerShop = useForm<TFormRegisterShop>({
            defaultValues: {
                  shop_name: '',
            },

            resolver: zodResolver(schema),
      })

      const [imageAvatar, setImageAvatar] = useState<File>()
      const [imagePreview, setImagePreview] = useState<string>('')
      const [modalFilePreview, setModalFilePreview] = useState<boolean>(false)
      const [first, setFirst] = useState<boolean>(false)
      const inputRef = useRef<HTMLInputElement>(null)
      const dispatch = useDispatch()
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse

      const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            e.stopPropagation()
            if (inputRef.current) {
                  inputRef.current.click()
            }
      }

      const [shopAvatarUrl, setshopAvatarUrl] = useState<TShopAvatarReturn>({
            shop_avatar: { secure_url: '', public_id: '' },
            shop_id: '',
      })

      const registerShopMutation = useMutation({
            mutationKey: ['register-shop'],
            mutationFn: () => ShopApi.getMyShop(),
      })

      const uploadImage = useMutation({
            mutationKey: ['upload-avatar-shop'],
            mutationFn: (formData: IUploadImageAvatar) => ShopApi.uploadAvatar(formData),
            onSuccess: (data) => setshopAvatarUrl(data.data.metadata),
      })

      const deleteImage = useMutation({
            mutationKey: ['delete-avatar-shop'],
            mutationFn: ({ shop_id, public_id }: { shop_id: string; public_id: string }) => ShopApi.deleteAvatar({ shop_id, public_id }),
      })

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (imageAvatar) {
                  setImageAvatar(undefined)
            }
            setImageAvatar(e!.target!.files![0])
      }

      const openModalPreview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            e.stopPropagation()
            setModalFilePreview(true)
      }

      const handleDeleteImageCurrent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            e.stopPropagation()
            if (imagePreview) {
                  URL.revokeObjectURL(imagePreview)
                  setImagePreview('')
            }
            if (imageAvatar) {
                  setImageAvatar(undefined)
            }
            if (shopAvatarUrl) {
                  setshopAvatarUrl({
                        shop_avatar: { secure_url: '', public_id: '' },
                        shop_id: '',
                  })
            }
            deleteImage.mutate({ shop_id: shopAvatarUrl.shop_id, public_id: shopAvatarUrl.shop_avatar.public_id })
            if (inputRef.current) {
                  inputRef.current.click()
            }
      }

      const onSubmit = (data: TFormRegisterShop) => {
            if (!imageAvatar && !first) {
                  dispatch(
                        addToast({
                              type: 'WARNNING',
                              message: 'Nếu bạn không chọn ảnh, thì ảnh đại diện sẽ hiển thị mặc định',
                              id: Math.random().toString(),
                        }),
                  )
                  setFirst(true)
            }
            // console.log({ data })
            // registerShopMutation.mutate(data)
      }

      useEffect(() => {
            if (imageAvatar) {
                  const url = URL.createObjectURL(imageAvatar)
                  setImagePreview(url)
                  const formData: IUploadImageAvatar = new FormData()
                  formData.append('image', imageAvatar)
                  uploadImage.mutate(formData)
            }

            return () => URL.revokeObjectURL(imagePreview)
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [imageAvatar])

      useEffect(() => {
            if (registerShopMutation.isSuccess) {
                  // const { user } = registerShopMutation.data.data.metadata
                  dispatch(fetchUser({ user }))
            }
      }, [registerShopMutation.isSuccess])

      return (
            <div className='w-full'>
                  <p>Đăng kí mở Shops</p>
                  <FormProvider {...registerShop}>
                        <form
                              className='w-[150px] xl:w-[400px] min-h-[300px] h-max mx-auto py-[24px] rounded-lg flex flex-col gap-[16px]'
                              onSubmit={registerShop.handleSubmit(onSubmit)}
                        >
                              <InputText<TFormRegisterShop>
                                    LabelMessage='Tên của Shop'
                                    placehorder='Nhập tên của Shop'
                                    FieldName='shop_name'
                              />
                              <input type='file' hidden ref={inputRef} onChange={handleInputChange} />
                              {imagePreview && (
                                    <div className='w-full flex justify-center'>
                                          <img src={imagePreview} className='w-[160px] h-[160px]' alt='preview' />
                                          <button
                                                className='bg-slate-700 rounded-lg px-[16px] py-[12px] text-white ml-[20px]'
                                                onClick={openModalPreview}
                                          >
                                                Xem trước
                                          </button>
                                    </div>
                              )}

                              {!imageAvatar && (
                                    <button className='bg-slate-700 rounded-lg px-[16px] py-[12px] text-white' onClick={handleClick}>
                                          {'Tải ảnh đại diện cho cửa hàng'}
                                    </button>
                              )}

                              {imageAvatar && (
                                    <button
                                          className='bg-slate-700 rounded-lg px-[16px] py-[12px] text-white'
                                          onClick={handleDeleteImageCurrent}
                                    >
                                          {'Chọn lại'}
                                    </button>
                              )}

                              <button type='submit' className='bg-slate-700 rounded-lg px-[16px] py-[12px] text-white'>
                                    Gửi đăng kí
                              </button>
                        </form>
                  </FormProvider>

                  {modalFilePreview && <BoxModalPreview setModalFilePreview={setModalFilePreview} filePreview={imagePreview} />}
            </div>
      )
}

export default ShopRegister
