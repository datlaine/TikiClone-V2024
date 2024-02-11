import React, { SetStateAction, useEffect, useId, useRef, useState } from 'react'

//@api
import ProductApi, { IFormDataImage } from '../../../../apis/product.api'
import { useMutation } from '@tanstack/react-query'

//@icon
import { View, X } from 'lucide-react'
//@modal
import BoxModal from '../../../../component/ui/BoxModal'
import { ui } from '../FormRegisterBook'
import { TChekUploadImage, TProfileImage } from '../../../../types/product/product.type'

//@Props
interface IProps {
      //@Tên nút button
      labelMessage: string

      //@width
      width?: string

      //@tất cả thông tin về hình ảnh
      setUrlProductThumb: React.Dispatch<SetStateAction<TProfileImage>>
      product_id?: string

      //@trạng thái submit
      isSubmit?: boolean
}

const ButtonUpload = (props: IProps) => {
      const { width, labelMessage, setUrlProductThumb, isSubmit, product_id } = props
      const id = useId()
      const inputRef = useRef<HTMLInputElement>(null)

      const [fileProduct, setFileProduct] = useState<File>()
      const [filePreview, setFilePreview] = useState<string | undefined>()
      const [modalFilePreview, setModalFilePreview] = useState(false)

      //@api upload image
      const uploadProductThumb = useMutation({
            mutationKey: ['product-thumb'],
            mutationFn: (data: IFormDataImage) =>
                  ProductApi.uploadProductImage({ formData: data, url: 'v1/api/product/upload-product-thumb' }),
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
                        isUploadImage: false,
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
            deleteProductThumb.mutate({ public_id, id: product_id as string })
            URL.revokeObjectURL(filePreview as string)
            setFilePreview('')
            if (inputRef) {
                  inputRef!.current!.value = ''
            }

            setUrlProductThumb({
                  isUploadImage: false,
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
                  const formData = new FormData()
                  formData.append('file', fileProduct)
                  formData.append('product_id', product_id as string)

                  uploadProductThumb.mutate(formData)
            }

            //@tạo blob từ file đã gữi
            const url = URL.createObjectURL(fileProduct)
            setFilePreview(url)
            return () => URL.revokeObjectURL(url)
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [fileProduct])

      //@effect-api - nếu call api thành công thì set lại state thông tin của file rồi gửi lại cho form cha,
      useEffect(() => {
            if (uploadProductThumb.isSuccess) {
                  const { metadata } = uploadProductThumb.data.data
                  if (metadata.product.product_thumb_image) {
                        setUrlProductThumb({
                              isUploadImage: true,
                              FileLength: fileProduct ? 1 : 0,
                              FileName: fileProduct?.name.replace(/.*[\/\\]/, '') as string,
                        })
                  }
            }
      }, [
            uploadProductThumb.isSuccess,
            setUrlProductThumb,
            uploadProductThumb.data?.data,
            uploadProductThumb.data?.data.metadata.product.product_thumb_image,
            uploadProductThumb.data?.data.metadata.product.product_id,
            fileProduct?.name,
            fileProduct,
      ])

      const styleEffect = {
            cursorButtonUpload: uploadProductThumb.isPending ? 'cursor-not-allowed' : 'cursor-pointer',
            widthButtonUpload: width ? 'w-[25%]' : 'w-full',
            stateButton:
                  isSubmit && !fileProduct
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
                  <button
                        hidden={filePreview ? true : false}
                        disabled={uploadProductThumb.isPending}
                        className={`${styleEffect.widthButtonUpload} ${styleEffect.widthButtonUpload} ${styleEffect.stateButton}  xl:w-[32%] min-h-[40px] flex-1  rounded-md`}
                        onClick={(e) => handleButtonClick(e)}
                  >
                        Tải ảnh lên
                  </button>
                  {isSubmit && !fileProduct && (
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
                                          disabled={uploadProductThumb.isPending}
                                          onClick={() => {
                                                handleDeleteProductThumb(
                                                      uploadProductThumb.data?.data.metadata.product.product_thumb_image
                                                            .public_id as string,
                                                )
                                                inputRef.current?.click()
                                          }}
                                          className='min-w-[150px] px-[12px] py-[6px] bg-slate-700 text-white rounded-md '
                                    >
                                          Chọn lại
                                    </button>
                              </div>
                              <div className='absolute bottom-[0px] right-[-140px] bg-white h-[35px] min-w-[150px] flex items-center justify-center rounded-full gap-[16px]'>
                                    <View onClick={() => setModalFilePreview(true)} size={28} className=' ' />
                                    <span>Xem trước</span>
                              </div>
                              {uploadProductThumb.isPending && (
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

export default ButtonUpload
