import React, { ReactElement, useEffect, useState } from 'react'

//@icon
import { Check } from 'lucide-react'

//@api
import ProductApi, { IFormDataProductFull } from '../../../apis/product.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

//@form
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValue, FieldValues, FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

//@components
import InputText from '../components/InputText'
import InputNumber from '../components/InputNumber'
import Timeline from '../components/Timeline'
import { useDispatch } from 'react-redux'
import { addToast } from '../../../Redux/toast'
import { productBookSchema, productSchema } from '../types/product.schema'
import Book from '../Category/Book/Book'
import { TCheckDescriptionImage, TChekUploadImage, TProductDetail, TProfileImage } from '../../../types/product/product.type'
import { TRegisterFormBook } from '../../../types/product/product.book.type'
import { returnPublicIdCloudinary, returnSecureUrlCloudinary } from '../../../utils/cloudinary.util'
import { TCloudinaryImage, TCloudinaryPublicId } from '../types/cloudinary.typs'
import ButtonUpload from '../RegisterProductForm/components/ButtonUpload'
import UpdateMultipleImage from './components/UpdateMultipleImage'
import { Link } from 'react-router-dom'

//@Props - Product::Book

//@type form chính

//@schema chính
const schema = productSchema.merge(productBookSchema)

export const ui = {
      gapElementChild: 'gap-[6px]',
      gapElementChildButton: 'gap-[12px]',
      fontSizeError: 'text-[12px]',
      colorError: 'text-red-700',
}
type TProps<T, K, Form> = {
      mode?: 'UPLOAD' | 'UPDATE'
      product_id: string
      ProductAttribute: React.ReactNode
      TimelineProps: {
            FieldName: keyof T
            label: keyof K
      }[]
      defaultValues: Form
      product?: TProductDetail
      public_id?: string
      public_id_array?: { secure_url: string; public_id: string }[]
}

const defaultValues: TRegisterFormBook = {
      product_id: '',
      product_name: '',
      product_price: null,
      attribute: {
            publishing: '',
            page_number: 0,
            author: '',
            description: '',
      },
}

//@Component
const ProductUpdate = <T, K, Form extends FieldValues>(props: TProps<T, K, Form>) => {
      const { product_id, ProductAttribute, TimelineProps, mode = 'UPLOAD', product } = props

      //@trang thái submit
      const [, setFormStateSubmit] = useState(false)
      const dispatch = useDispatch()

      const queryClient = useQueryClient()
      //@lấy thông tin hình ảnh
      const [urlProductThumb, setUrlProductThumb] = useState<TProfileImage>({
            isUploadImage: false,
            FileName: '',
            FileLength: 0,
      })

      //@lấy thông tin các hình
      const [urlProductMultipleImage, setUrlProductMultipleImage] = useState<TCheckDescriptionImage>({
            numberImage: 0,
            isUploadImage: false,
      })

      //@lấy thông tin tên các hình
      const [getFileName, setGetFileName] = useState<string[]>([])
      // console.log({ getFileName })
      //@useForm
      const methods = useForm<typeof defaultValues>({
            defaultValues: product,
            resolver: zodResolver(schema),
      })
      // console.log({ formError: methods.formState.errors })

      //@hàm upload sản phẩn
      const uploadProductFull = useMutation({
            mutationKey: ['upload-product-full'],
            mutationFn: (data: IFormDataProductFull) => ProductApi.uploadProductFull(data),
      })

      //@hàm submit sản phẩm
      const onSubmit = (data: TRegisterFormBook) => {
            setFormStateSubmit(true)
            // console.log({ data })

            if (!urlProductMultipleImage.isUploadImage) {
                  dispatch(
                        addToast({
                              type: 'ERROR',
                              message: `Upload thêm ${4 - urlProductMultipleImage.numberImage} để đủ 4 ảnh bạn nhé`,
                              id: Math.random().toString(),
                        }),
                  )
            }

            if (!urlProductThumb.isUploadImage) {
                  dispatch(
                        addToast({
                              type: 'ERROR',
                              message: 'Hình đại diện sản phẩm là bắt buộc',
                              id: Math.random().toString(),
                        }),
                  )
            }

            // chỉ submit khi có đủ image
            if (urlProductThumb.isUploadImage && urlProductMultipleImage.isUploadImage) {
                  // console.log({ urlProductThumb })

                  const formData: IFormDataProductFull = new FormData()
                  formData.append('_id ', product_id)

                  formData.append('product_name', data.product_name)
                  formData.append('product_price', data.product_price as number)

                  formData.append('publishing', data.attribute.publishing)
                  formData.append('author', data.attribute.author)
                  formData.append('page_number', data.attribute.page_number)
                  formData.append('description', data.attribute.description)

                  uploadProductFull.mutate(formData)
            }
      }

      console.log({ submit: methods.formState.isSubmitted, success: methods.formState.isSubmitSuccessful })

      useEffect(() => {
            const callAgain = async () => {
                  queryClient.invalidateQueries({
                        queryKey: ['get-all-product   '],
                        refetchType: 'active',
                  })
            }

            if (uploadProductFull.isSuccess) {
                  callAgain()
                  queryClient.invalidateQueries()
            }
      }, [uploadProductFull.isSuccess, queryClient])

      // console.log({ defaultValues: methods.formState.defaultValues })

      return (
            <React.Fragment>
                  {!methods.formState.isSubmitted && (
                        <div className='animate-mountComponent w-full h-auto flex justify-center '>
                              <div className=' w-[full] lg:w-[65%]  h-full'>
                                    <FormProvider {...methods}>
                                          <form
                                                className='w-full lg:w-[60%]  flex flex-col gap-[24px] p-[16px]'
                                                onSubmit={methods.handleSubmit(onSubmit)}
                                                spellCheck={false}
                                          >
                                                <div className=''>Thông tin cơ bản về sản phẩm</div>
                                                <InputText
                                                      methods={methods}
                                                      FieldName='product_name'
                                                      LabelMessage='Tên sản phẩm'
                                                      placehorder='Nhập tên sản phẩm'
                                                      width={'xl:w-[100%]'}
                                                      autofocus={true}
                                                      require={true}
                                                />

                                                <InputNumber
                                                      FieldName='product_price'
                                                      LabelMessage='Giá sản phẩm'
                                                      placehorder='Nhập giá sản phẩm'
                                                      width={'xl:w-[100%]'}
                                                      require={true}
                                                />
                                                <ButtonUpload
                                                      mode='UPDATE'
                                                      CloudinaryImage={product?.product_thumb_image}
                                                      product_id={product_id}
                                                      labelMessage='Chọn hình đại diện cho sản phẩm'
                                                      width={'xl:w-[32%]'}
                                                      setUrlProductThumb={setUrlProductThumb}
                                                      isSubmit={methods.formState.isSubmitted ? true : false}
                                                />

                                                <UpdateMultipleImage
                                                      CloudinaryImage={product?.product_desc_image as TCloudinaryImage[]}
                                                      mode={mode}
                                                      labelMessage='Chọn các hình description cho sản phẩm'
                                                      width={'xl:w-[100%]'}
                                                      setUrlProductMultipleImage={setUrlProductMultipleImage}
                                                      setGetFileName={setGetFileName}
                                                      product_id={product_id}
                                                      isSubmit={methods.formState.isSubmitted ? true : false}
                                                />
                                                <>{ProductAttribute}</>
                                                <button
                                                      type='submit'
                                                      className='min-w-[150px] px-[12px] py-[6px] bg-slate-700 text-white flex justify-center items-center gap-[8px]'
                                                >
                                                      <span>{!uploadProductFull.isSuccess ? 'Đăng bán' : 'Đăng sản phẩm thành công'}</span>

                                                      {uploadProductFull.isPending && (
                                                            <span
                                                                  className='inline-block h-[25px] w-[25px] text-white animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                                                  role='status'
                                                            ></span>
                                                      )}
                                                </button>
                                          </form>
                                    </FormProvider>
                              </div>

                              <div className='hidden h-max min-w-[160px] w-auto lg:flex flex-col gap-[28px]  py-[24px] pl-[8px] pr-[24px] bg-bgTimeLine border-r-4 border-blue-300 rounded-lg'>
                                    <Timeline
                                          attribute={false}
                                          methods={methods}
                                          value={methods.watch('product_name')}
                                          FieldName='product_name'
                                          TimeLineName='Tên sản phẩm'
                                          type='Text'
                                    />

                                    <Timeline
                                          attribute={false}
                                          methods={methods}
                                          value={methods.watch('product_price')?.toString()}
                                          FieldName='product_price'
                                          TimeLineName='Giá sản phẩm'
                                          type='Money'
                                    />
                                    <Timeline
                                          attribute={false}
                                          TimeLineName='Hình đại diện sản phẩm'
                                          type='File'
                                          File={{
                                                isUploadImage: urlProductThumb.isUploadImage,
                                                FileName: urlProductThumb.FileName,
                                          }}
                                          isSubmit={methods.formState.isSubmitted ? true : false}
                                    />
                                    <Timeline
                                          attribute={false}
                                          TimeLineName='Các hình mô tả sản phẩm'
                                          type='Files'
                                          Files={{
                                                FileName: getFileName || '',
                                                isUploadImages: urlProductMultipleImage.isUploadImage,
                                          }}
                                          isSubmit={methods.formState.isSubmitted ? true : false}
                                    />
                                    {TimelineProps.map((timeline) => (
                                          <Timeline<T, typeof defaultValues>
                                                attribute={true}
                                                methods={methods}
                                                type='Text'
                                                FieldName={timeline.FieldName}
                                                TimeLineName={timeline.label as string}
                                          />
                                    ))}

                                    <div className='flex items-center justify-center bg-blue-700 w-[20px] h-[20px] rounded-full'>
                                          <Check color='white' size={12} />
                                    </div>
                              </div>
                        </div>
                  )}

                  {methods.formState.isSubmitted && (
                        <>
                              <Link to={`/product/${product_id}`}>Đường dẫn của sản phẩm</Link>
                        </>
                  )}
            </React.Fragment>
      )
}

export default ProductUpdate
