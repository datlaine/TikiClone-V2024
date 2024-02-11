import React, { SetStateAction, useEffect, useId, useRef, useState } from 'react'

//@api
import ProductApi, { IFormDataImage, IFormDataImageUpdate } from '../../../../apis/product.api'
import { useMutation } from '@tanstack/react-query'

//@icon
import { View, X } from 'lucide-react'
//@modal
import BoxModal from '../../../../component/ui/BoxModal'
import { ui } from '../FormUpdateBook'
import { TProductDetail } from '../../../../types/product/product.type'

//@Props
interface IProps {
      //@Tên nút button
      labelMessage: string

      //@width
      width?: string

      mode: 'UPLOAD' | 'UPDATE'
      setMode: React.Dispatch<React.SetStateAction<'UPLOAD' | 'UPDATE'>>

      //@tất cả thông tin về hình ảnh
      setUrlProductThumb: React.Dispatch<
            SetStateAction<{
                  product_thumb_image: { secure_url: string; public_id: string }
                  FileName: string
                  FileLength: number
            }>
      >
      product: TProductDetail
      product_id: string
      public_id: string
      //@trạng thái submit
      isSubmit?: boolean
}

const ButtonUploadWithId = (props: IProps) => {
      const { width, labelMessage, mode, setMode, setUrlProductThumb, isSubmit, product_id, public_id, product } = props
      const id = useId()
      const inputRef = useRef<HTMLInputElement>(null)

      const [fileProduct, setFileProduct] = useState<File>()
      const [filePreview, setFilePreview] = useState<string | undefined>()
      const [modalFilePreview, setModalFilePreview] = useState(false)

      //@api upload image
      const updateProductThumb = useMutation({
            mutationKey: ['product-thumb'],
            mutationFn: (data: IFormDataImageUpdate) => ProductApi.updateProductThumb(data),
      })

      //@api delete image
      const deleteProductThumb = useMutation({
            mutationKey: ['delete-product-thumb'],
            mutationFn: ({ public_id, id }: { public_id: string; id: string }) => ProductApi.deleteProductThumb({ public_id, id }),
      })

      //@handler click
      const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()
            e.preventDefault()
            if (inputRef.current) {
                  inputRef.current.click()
            }
      }

      //@input click
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            //@trước khi lấy cái mới thì xóa cái cũ
            if (filePreview || fileProduct) {
                  setFilePreview(undefined)
                  setFileProduct(undefined)
                  setUrlProductThumb({
                        product_thumb_image: { secure_url: '', public_id: '' },
                        FileName: '',
                        FileLength: 0,
                  })
            }

            //@file hình ảnh
            if (e.target.files) {
                  setFileProduct(e.target.files[0])
            }
      }

      const handleDeleteProductThumb = (public_id: string) => {
            deleteProductThumb.mutate({ public_id, id: updateProductThumb?.data?.data?.metadata?.product?.product_id as string })
            URL.revokeObjectURL(filePreview as string)

            setFilePreview('')
            if (inputRef) {
                  inputRef!.current!.value = ''
            }

            setUrlProductThumb({
                  product_thumb_image: { secure_url: '', public_id: '' },
                  FileName: '',
                  FileLength: 0,
            })
      }

      //@effect one
      useEffect(() => {
            //@file empty
            if (!fileProduct) {
                  setFilePreview('')
                  return
            }

            //@có file thì call gửi lên server -> phần product_id quan trọng nhất đó
            if (fileProduct) {
                  console.log({ fileProduct })
                  const formData = new FormData()
                  formData.append('file', fileProduct)
                  formData.append('product_id', product_id)
                  formData.append('public_id', public_id)

                  updateProductThumb.mutate(formData)
            }

            //@tạo blob từ file đã gữi
            const url = URL.createObjectURL(fileProduct)
            setFilePreview(url)
            return () => URL.revokeObjectURL(url)
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [fileProduct])

      //@effect-api - nếu call api thành công thì set lại state thông tin của file rồi gửi lại cho form cha,
      useEffect(() => {
            if (updateProductThumb.isSuccess) {
                  const { metadata } = updateProductThumb.data.data
                  if (metadata.product.product_thumb_image) {
                        setUrlProductThumb({
                              product_thumb_image: {
                                    secure_url: metadata.product.product_thumb_image.secure_url,
                                    public_id: metadata.product.product_thumb_image.public_id,
                              },
                              FileLength: fileProduct ? 1 : 0,
                              FileName: fileProduct?.name.replace(/.*[\/\\]/, '') as string,
                        })
                  }
            }
      }, [
            updateProductThumb.isSuccess,
            setUrlProductThumb,
            updateProductThumb.data?.data,
            updateProductThumb.data?.data.metadata.product.product_thumb_image,
            updateProductThumb.data?.data.metadata.product.product_id,
            fileProduct?.name,
            fileProduct,
      ])

      const styleEffect = {
            cursorButtonUpload: updateProductThumb.isPending ? 'cursor-not-allowed' : 'cursor-pointer',
            widthButtonUpload: width ? 'w-[25%]' : 'w-full',
            stateButton:
                  !product.product_thumb_image.secure_url && isSubmit && !fileProduct
                        ? 'border-[2px] border-red-700 text-red-700 bg-white'
                        : 'text-white bg-slate-900 border-[2px] border-slate-900',

            gap: ui.gapElementChildButton || 'gap-[8px]',
            fontSizeError: ui.fontSizeError || 'text-[12px]',
            colorError: ui.colorError || 'text-red-700',
      }

      //@element
      return (
            <div className={`${styleEffect.gap} w-full min-h-[70px] h-auto flex flex-col`}>
                  <label htmlFor={id}>{labelMessage}</label>
                  <input type='file' id={id} hidden ref={inputRef} onChange={(e) => handleInputChange(e)} />
                  {mode === 'UPLOAD' && (
                        <button
                              hidden={filePreview ? true : false}
                              disabled={updateProductThumb.isPending}
                              className={`${styleEffect.widthButtonUpload} ${styleEffect.widthButtonUpload} ${styleEffect.stateButton}  xl:w-[32%] min-h-[40px] flex-1  rounded-md`}
                              onClick={(e) => handleButtonClick(e)}
                        >
                              Tải ảnh lên
                        </button>
                  )}
                  {!product.product_thumb_image.secure_url && isSubmit && !fileProduct && (
                        <span className={`${styleEffect.colorError} ${styleEffect.fontSizeError}`}>
                              Hình ảnh chỉnh của sản phẩm là bắt buộc
                        </span>
                  )}

                  {filePreview && (
                        <div className='w-[150px]  relative flex justify-center items-center'>
                              <img
                                    src={filePreview}
                                    width={150}
                                    height={150}
                                    alt='preview'
                                    className={`bg-yellow-700 max-w-[150px] max-h-[150px]`}
                              />
                              <div className='absolute top-0 right-[-100px] h-[35px] w-[95px] '>
                                    <button
                                          disabled={updateProductThumb.isPending}
                                          onClick={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                                handleDeleteProductThumb(
                                                      updateProductThumb.data?.data.metadata.product.product_thumb_image
                                                            .public_id as string,
                                                )
                                                inputRef.current?.click()
                                          }}
                                          className='min-w-[150px] px-[12px] py-[6px] bg-slate-700 text-white rounded-md '
                                    >
                                          Chọn lại từ đầu
                                    </button>
                              </div>
                              <div className='absolute bottom-[0px] right-[-40px] bg-white h-[35px] w-[35px] flex items-center justify-center rounded-full'>
                                    <View onClick={() => setModalFilePreview(true)} size={28} className=' ' />
                              </div>
                              {updateProductThumb.isPending && (
                                    <div className='absolute'>
                                          <span
                                                className='inline-block h-[45px] w-[45px] text-slate-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                                role='status'
                                          ></span>
                                    </div>
                              )}
                              {modalFilePreview && (
                                    <BoxModal>
                                          <div className='relative w-[450px] h-[650px]'>
                                                <img src={filePreview} alt='preview' className='w-full h-full bg-yellow-700' />
                                                <div
                                                      className='absolute top-[-10px] right-[-10px] bg-slate-900 flex items-center justify-center rounded-md'
                                                      onClick={() => setModalFilePreview(false)}
                                                >
                                                      <X color='white' size={40} />
                                                </div>
                                          </div>
                                    </BoxModal>
                              )}
                        </div>
                  )}

                  {!filePreview && product.product_thumb_image.secure_url && (
                        <div className='w-[150px]  relative flex justify-center items-center'>
                              <img
                                    src={product.product_thumb_image.secure_url}
                                    width={150}
                                    height={150}
                                    alt='preview'
                                    className={`bg-yellow-700 max-w-[150px] max-h-[150px]`}
                              />
                              <div className='absolute top-0 right-[-100px] h-[35px] w-[95px] '>
                                    <button
                                          disabled={updateProductThumb.isPending}
                                          onClick={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                                setMode('UPLOAD')

                                                handleDeleteProductThumb(
                                                      updateProductThumb.data?.data.metadata.product.product_thumb_image
                                                            .public_id as string,
                                                )
                                                inputRef.current?.click()
                                          }}
                                          className='min-w-[150px] px-[12px] py-[6px] bg-slate-700 text-white rounded-md '
                                    >
                                          Chọn lại từ đầu
                                    </button>
                              </div>
                              <div className='absolute bottom-[0px] right-[-40px] bg-white h-[35px] w-[35px] flex items-center justify-center rounded-full'>
                                    <View onClick={() => setModalFilePreview(true)} size={28} className=' ' />
                              </div>
                              {updateProductThumb.isPending && (
                                    <div className='absolute'>
                                          <span
                                                className='inline-block h-[45px] w-[45px] text-slate-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                                role='status'
                                          ></span>
                                    </div>
                              )}
                              {modalFilePreview && (
                                    <BoxModal>
                                          <div className='relative w-[450px] h-[650px]'>
                                                <img src={filePreview} alt='preview' className='w-full h-full bg-yellow-700' />
                                                <div
                                                      className='absolute top-[-10px] right-[-10px] bg-slate-900 flex items-center justify-center rounded-md'
                                                      onClick={() => setModalFilePreview(false)}
                                                >
                                                      <X color='white' size={40} />
                                                </div>
                                          </div>
                                    </BoxModal>
                              )}
                        </div>
                  )}
            </div>
      )
}

export default ButtonUploadWithId
// import React from 'react'

// const ButtonUploadWithId = () => {
//       return <div>ButtonUploadWithId</div>
// }

// export default ButtonUploadWithId
