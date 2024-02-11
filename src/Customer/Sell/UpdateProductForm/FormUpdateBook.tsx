import { useEffect, useState } from 'react'

//@icon
import { Check } from 'lucide-react'

//@api
import { useMutation, useQueryClient } from '@tanstack/react-query'

//@form
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { productBookSchema, productBookSchemaUpdate, productSchema } from '../types/product.schema'
import { useDispatch } from 'react-redux'
import ProductApi, { IFormDataProductFull } from '../../../apis/product.api'
import InputText from '../components/InputText'
import Book from '../Category/Book/Book'
import Timeline from '../components/Timeline'
import InputNumber from '../components/InputNumber'
import ButtonUploadWithId from './components/ButtonUploadWithId'
import ButtonUploadMultipleWithId from './components/ButtonUploadMultipleWithId'
import { TImageCLoudinary } from '../../../types/cloudinary.type'
import { TFormBook, TProductDetail, UploadImages } from '../../../types/product/product.type'

//@components

//@Props - Product::Book
export type BookProduct = {
      book: {
            book_publishing: string
            book_pageNumber: number
      }
}

//@type form chính
export type TRegisterFormBook = {
      product_id: string
      product_name: string
      product_price: number | null

      //@attribute book
      attribute: TFormBook
}

//@schema chính
const schema = productSchema.merge(productBookSchemaUpdate)

export const ui = {
      gapElementChild: 'gap-[6px]',
      gapElementChildButton: 'gap-[12px]',
      fontSizeError: 'text-[12px]',
      colorError: 'text-red-700',
}

type TProps = {
      defaultValues: {
            _id?: string | undefined
            product_name?: string | undefined
            product_price?: number | null | undefined
            attribute: TFormBook
      }
      product: TProductDetail
      public_id: string
      public_id_array: TImageCLoudinary[]
}

//@Component
const FormUpdateBook = (props: TProps) => {
      const { defaultValues, public_id, public_id_array, product } = props

      console.log({ defaultValues })

      //@trang thái submit
      const [, setFormStateSubmit] = useState(false)
      const dispatch = useDispatch()

      const queryClient = useQueryClient()

      //@lấy thông tin hình ảnh
      const [urlProductThumb, setUrlProductThumb] = useState<UploadImages>({
            product_thumb_image: { secure_url: '', public_id: '' },
            FileName: '',
            FileLength: 0,
      })

      const [mode, setMode] = useState<'UPLOAD' | 'UPDATE'>('UPDATE')
      console.log({ global: mode })
      //@lấy thông tin các hình
      const [urlProductMultipleImage, setUrlProductMultipleImage] = useState<UploadImages[]>([])

      //@lấy thông tin tên các hình
      const [getFileName, setGetFileName] = useState<string[]>([])

      //@useForm
      const methods = useForm<TRegisterFormBook>({
            defaultValues: {
                  product_id: defaultValues._id,
                  product_name: defaultValues.product_name,
                  product_price: defaultValues.product_price,
                  attribute: {
                        publishing: defaultValues.attribute.publishing,
                        page_number: defaultValues.attribute.page_number,
                        author: defaultValues.attribute.author,
                        description: defaultValues.attribute.description,
                  },
            },
            resolver: zodResolver(schema),
      })

      console.log({ def: methods.formState.defaultValues })

      //@hàm upload sản phẩn
      const uploadProductFull = useMutation({
            mutationKey: ['upload-product-full'],
            mutationFn: (data: IFormDataProductFull) => ProductApi.uploadProductFull(data),
      })

      console.log({ error: methods!.formState.errors })
      console.log({ watch: methods.watch('attribute.publishing') })

      //@hàm submit sản phẩm
      const onSubmit = (data: TRegisterFormBook) => {
            setFormStateSubmit(true)
            console.log({ data })

            // if (urlProductMultipleImage.length < 4) {
            //     // alert(urlProductMultipleImage.length)
            //     dispatch(addToast({ type: 'WARNNING', message: 'Xin upload ít nhất 4 hình ảnh mô tả sản phẩm', id: Math.random().toString() }))
            // }

            // chỉ submit khi có đủ image
            // if (urlProductThumb.product_thumb_image.secure_url && urlProductMultipleImage.length === 4) {
            console.log({ urlProductThumb })

            const formData: IFormDataProductFull = new FormData()
            formData.append('_id ', product._id)

            formData.append('product_name', data.product_name)
            formData.append('product_price', data.product_price as number)
            urlProductMultipleImage.forEach((url) => formData.append('product_image_description', JSON.stringify(url)))

            formData.append('publishing', data.attribute.publishing)
            formData.append('author', data.attribute.author)
            formData.append('page_number', data.attribute.page_number)
            formData.append('description', data.attribute.description)

            // for (let [key, value] of formData) {
            //     console.log(`${key}: ${value}`)
            // }
            uploadProductFull.mutate(formData)
            // }
      }

      console.log({ watch: methods.watch('product_name') })

      useEffect(() => {
            const callAgain = async () => {
                  queryClient.invalidateQueries({
                        queryKey: ['product-all'],
                        refetchType: 'active',
                  })
                  queryClient.invalidateQueries({
                        queryKey: ['get-product-with-id', product._id],
                        refetchType: 'active',
                  })

                  queryClient.invalidateQueries({
                        queryKey: ['get-all-product'],
                        refetchType: 'active',
                  })
            }

            if (uploadProductFull.isSuccess) {
                  callAgain()
            }
      }, [uploadProductFull.isSuccess, queryClient])

      useEffect(() => {
            if (product.product_thumb_image.secure_url) {
                  // setGetFileName(prev => {...prev,})
                  // setUrlProductThumb((prev) => {
                  //       return {
                  //             ...prev,
                  //             FileLength: 1,
                  //             product_id: product._id,
                  //             product_thumb_image: product.product_thumb_image,
                  //             FileName: product.product_thumb_image.secure_url,
                  //       }
                  // })
            }
      }, [])

      useEffect(() => {}, [mode, product])

      return (
            <div className='animate-mountComponent w-full h-auto flex justify-center '>
                  <div className=' w-[full] lg:w-[65%]  h-full'>
                        <FormProvider {...methods}>
                              <form
                                    className='w-full lg:w-[60%]  flex flex-col gap-[24px] p-[16px]'
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                    spellCheck={false}
                              >
                                    <div className=''>Thông tin cơ bản về sản phẩm</div>
                                    <InputText<TRegisterFormBook>
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
                                    <ButtonUploadWithId
                                          mode={mode}
                                          setMode={setMode}
                                          product={product}
                                          product_id={defaultValues._id as string}
                                          public_id={public_id as string}
                                          labelMessage='Chọn hình đại diện cho sản phẩm'
                                          width={'xl:w-[32%]'}
                                          setUrlProductThumb={setUrlProductThumb}
                                          isSubmit={methods.formState.isSubmitted ? true : false}
                                    />

                                    <ButtonUploadMultipleWithId
                                          public_id_array={public_id_array}
                                          labelMessage='Chọn các hình description cho sản phẩm'
                                          width={'xl:w-[100%]'}
                                          setUrlProductMultipleImage={setUrlProductMultipleImage}
                                          setGetFileName={setGetFileName}
                                          product_id={defaultValues._id as string}
                                          isSubmit={methods.formState.isSubmitted ? true : false}
                                    />
                                    <Book mode='UPDATE' />

                                    <button type='submit' className='min-w-[150px] px-[12px] py-[6px] bg-slate-700 text-white'>
                                          Đăng bán
                                    </button>
                              </form>
                        </FormProvider>
                  </div>

                  <div className='hidden h-max min-w-[160px] w-auto lg:flex flex-col gap-[28px]  py-[24px] pl-[8px] pr-[24px] bg-bgTimeLine border-r-4 border-blue-300 rounded-lg'>
                        <Timeline methods={methods} FieldName='product_name' TimeLineName='Tên sản phẩm' type='Text' />
                        <Timeline methods={methods} FieldName='product_price' TimeLineName='Giá sản phẩm' type='Money' />
                        <Timeline
                              TimeLineName='Hình đại diện sản phẩm'
                              type='File'
                              File={{
                                    FileName: '',
                                    // CountFile: urlProductThumb.FileLength,
                                    isUploadImage: true,
                              }}
                              mode={mode}
                              isSubmit={methods.formState.isSubmitted ? true : false}
                        />
                        <Timeline
                              TimeLineName='Các hình mô tả sản phẩm'
                              type='Files'
                              Files={{
                                    FileName: getFileName || '',
                                    // CountFile: getFileName.length || 0,
                                    isUploadImages: true,
                              }}
                              isSubmit={methods.formState.isSubmitted ? true : false}
                        />
                        {/* <Timeline methods={methods} FieldName='attribute.publishing' TimeLineName='Nhà xuất bản' type='Text' />

                <Timeline methods={methods} FieldName='attribute.page_number' TimeLineName='Số trang' type='Text' />
                <Timeline methods={methods} FieldName='attribute.author' TimeLineName='Tên tác giả' type='Text' />
                <Timeline methods={methods} FieldName='attribute.description' TimeLineName='Mô tả chi tiết' type='Text' /> */}

                        <div className='flex items-center justify-center bg-blue-700 w-[20px] h-[20px] rounded-full'>
                              <Check color='white' size={12} />
                        </div>
                  </div>
            </div>
      )
}

export default FormUpdateBook
// import React from 'react'

// const FormUpdateBook = () => {
//       return <div>FormUpdateBook</div>
// }

// export default FormUpdateBook
