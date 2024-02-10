import React, { SetStateAction, useEffect, useId, useRef, useState } from 'react'

//@modal và icon
import { View, X } from 'lucide-react'
import BoxModal from '../../../../component/ui/BoxModal'

//@dispatch toast
import { useDispatch } from 'react-redux'
import { addToast } from '../../../../Redux/toast'

//@api
import { useMutation } from '@tanstack/react-query'
import ProductApi, { IFormDataImages } from '../../../../apis/product.api'
import { ui } from '../FormUpdateBook'
import { TImageCLoudinary } from '../../../../types/cloudinary.type'
import { UploadImages } from '../../../../types/product/product.type'

//@Props
interface IProps {
      //@tên nút button
      labelMessage: string

      //@witdh mà cái này sắp bỏ rồi
      width?: string

      //@toàn bộ dữ liệu từ việc upload 4 hình ảnh sẽ được trả cho form parent để xử lí
      setUrlProductMultipleImage: React.Dispatch<SetStateAction<UploadImages[]>>

      //@do form t chia ra làm 3 phần, 2 phần hình 1 phần text nên product_id là cái liên kết duy nhất của cả 3
      product_id: string
      public_id_array: TImageCLoudinary[]
      //@lấy tên của 4 file cho timeline hiển thị
      setGetFileName: React.Dispatch<SetStateAction<string[]>>

      //@trạng thái submit
      isSubmit: boolean
}

//@Component
const ButtonUploadMultipleWithId = (props: IProps) => {
      const { labelMessage, width, product_id, isSubmit, setUrlProductMultipleImage, setGetFileName, public_id_array } = props

      //@Input upload chính
      const inputRef = useRef<HTMLInputElement>(null)

      //@dùng cho label match với input
      const id = useId()

      //@dispatch toast
      const dispatch = useDispatch()

      //@dùng để lưu lại product_id phòng thời trường hợp xóa sửa
      const [, setProductId] = useState<string>()

      //@dùng để lưu 4 file
      const [fileProduct, setFileProduct] = useState<File[]>([])

      //@dùng để lưu link blob
      const [filePreview, setFilePreview] = useState<string[]>(() => {
            console.log({ array: public_id_array })
            return public_id_array.map((image) => image.secure_url)
      })

      console.log({ preview: filePreview })

      //@model xem trước [dùng potarl]
      const [modalFilePreview, setModalFilePreview] = useState(false)

      const [selectImageModal, setSelectImageModal] = useState<string>('')

      //@hàm kích hoạt upload, sau thành công thì set product_id từ api trả về, và setState mảng file từ dũ liệu api trả về
      const updateImages = useMutation({
            mutationKey: ['update-image-full'],
            mutationFn: (data: IFormDataImages) => ProductApi.updateProductImagesFull(data),
            onSuccess: (data) => {
                  setUrlProductMultipleImage((prev) => prev.concat(data.data.metadata.product.productDemo.product_desc_image))
                  setProductId(data.data.metadata.product.productDemo._id)
            },
      })

      //@hàm kích hoạt xóa, đây là lấy cần dùng cái product_id nè
      const deleteImages = useMutation({
            mutationKey: ['delete-product-image-full'],
            mutationFn: ({ id }: { id: string }) => ProductApi.deleteImages({ id: product_id }),
      })

      console.log({ filePreview, public_id_array })

      //@Click vào button, kích hoạt inputRef click
      const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            //@chặn submit tới form cha
            e.preventDefault()
            if (inputRef.current) {
                  inputRef.current.click()
            }
      }

      //@kích hoạt onChange input
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log({ target: e.target.files?.length })
            //@nếu file vượt quá 4 thì xét 3 state chính lại mặc định và mount toast
            if (filePreview.length > 4 || fileProduct.length > 4 || e.target.files!.length > 4) {
                  // setFilePreview([])
                  // setFileProduct([])
                  // setGetFileName([])
                  dispatch(addToast({ type: 'WARNNING', message: 'Chỉ upload tối đa 4 files', id: Math.random().toString() }))
                  // inputRef!.current!.value = ''

                  return
            }

            /* khi xét state trong loop, không được dùng setState(prev => [prev, ...index])
            phải tạo 1 biến lưu lại kết quả của loop rồi xét 1 lượt luôn nè
        */

            //@nếu file bé hơn 4, lưu ý là bé hơn chứ không = 4, bé hơn thì khả năng người dùng còn chọn thêm file mới nữa
            if (e.target.files && e.target.files!.length <= 4 && fileProduct.length < 4) {
                  //@nếu số file người dùng push vào + với số file sẵn có từ lần trước mà quá hơn 4 thì mount toast
                  if (fileProduct.length + e.target.files.length > 4) {
                        alert('OK')
                        dispatch(
                              addToast({
                                    type: 'WARNNING',
                                    message: `Chỉ upload tối đa 4 files ${fileProduct.length}`,
                                    id: Math.random().toString(),
                              }),
                        )
                        inputRef!.current!.value = ''

                        return
                  }
                  // dispatch(addToast({ type: 'ERROR', message: 'Upload mix', id: Math.random().toString() }))
                  //@nếu không lớn hơn kích thước thì tiến hành push file mới vào mảng file đã có sẵn
                  setFileProduct((prev) => {
                        //@lấy số file mới người dùng chọn
                        const countFile = e.target.files?.length as number
                        const newArrayFile = [...prev]
                        for (let index = 0; index < countFile; index++) {
                              newArrayFile.push(e!.target!.files![index])
                        }
                        return newArrayFile
                  })

                  // @lấy tên file gửi cho timeline, quy luật giống với push file
                  setGetFileName((prev) => {
                        const countFile = e.target.files?.length as number
                        const newArrayFile = [...prev]
                        for (let index = 0; index < countFile; index++) {
                              newArrayFile.push(e!.target!.files![index].name)
                        }
                        return newArrayFile
                  })

                  return
            }

            if (e.target.files && e.target.files.length <= 4) {
                  //     alert(2)
                  // setFileProduct((prev) => {
                  //     //@lấy số file mới người dùng chọn
                  //     const countFile = e.target.files?.length as number
                  //     const newArrayFile = []
                  //     for (let index = 0; index < countFile; index++) {
                  //         newArrayFile.push(e!.target!.files![index])
                  //     }
                  //     return newArrayFile
                  // })

                  setFileProduct(Array.from(e.target.files))
                  const arrayURL = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
                  setFilePreview((prev) => prev.concat(arrayURL))
                  setGetFileName((prev) => {
                        const countFile = e.target.files?.length as number
                        const newArrayFile = [...prev]
                        for (let index = 0; index < countFile; index++) {
                              newArrayFile.push(e!.target!.files![index].name)
                        }
                        return newArrayFile
                  })
                  // const arrayURL = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
                  // setFilePreview(() => arrayURL)
                  // setFileProduct(Array.from(e.target.files))
            }
            inputRef!.current!.value = ''
      }

      console.log({ file: fileProduct.length })

      const handleDeleteProductImages = () => {
            //api
            if (inputRef) {
                  inputRef!.current!.value = ''
                  inputRef.current?.click()
            }
            filePreview.forEach((removeURL) => URL.revokeObjectURL(removeURL))
            setFilePreview([])
            setFileProduct([])
            setGetFileName([])
            setUrlProductMultipleImage([])
            deleteImages.mutate({ id: product_id })
      }

      useEffect(() => {
            console.log({ fileProduct })
            const data = new FormData()
            if (fileProduct.length === 4) {
                  data.append('id', product_id)
                  fileProduct.forEach((file) => data.append(`files`, file))
                  public_id_array.forEach((file) => data.append('remove_url_array', file.public_id))
                  for (const [key, value] of data) {
                        console.log(key, value)
                  }
                  updateImages.mutate(data)
            }
            if (fileProduct.length > 0) {
                  // const arrayURL = fileProduct.map((file) => URL.createObjectURL(file))
                  // setFilePreview(() => arrayURL)
            }

            return () => {
                  filePreview.forEach((file) => URL.revokeObjectURL(file))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [fileProduct])

      const styleEffect = {
            withContainer: width ? width : 'w-full',
            heightWrapperFilePreview: filePreview.length > 0 ? 'w-[350px] ' : 'w-[80px] min-h-[60px]',
            stateButton:
                  isSubmit && fileProduct.length === 0
                        ? 'border-[2px] border-red-700 text-red-700 bg-white'
                        : 'text-white bg-slate-900 border-[2px] border-slate-900',

            flexContainerModal: filePreview.length === 1 ? 'flex-row' : filePreview.length > 2 ? 'flex-row' : `flex-col`,
            widthImageModal:
                  filePreview.length === 1
                        ? 'w-full h-full'
                        : filePreview.length > 2
                        ? `calc(90%/${filePreview.length - 1})`
                        : `calc(90%/${filePreview.length})`,

            gap: ui.gapElementChildButton || 'gap-[8px]',
            fontSizeError: ui.fontSizeError || 'text-[12px]',
            colorError: ui.colorError || 'text-red-700',
      }

      console.log({ filePreview })

      return (
            <div className={`${styleEffect.withContainer} ${styleEffect.gap} relative min-h-[80px] h-auto flex flex-col`}>
                  <label htmlFor={id}>{labelMessage}</label>
                  <input type='file' id={id} hidden ref={inputRef} multiple onChange={(e) => handleInputChange(e)} />

                  {/* {@số lượng file review} */}
                  {filePreview && filePreview.length > 0 && (
                        <p>
                              Tổng số lượng hình ảnh <span className='text-green-700 text-[28px] font-semibold'>{filePreview.length}</span>{' '}
                              / 4
                        </p>
                  )}

                  {/* {@các hình review} */}
                  {filePreview.length > 0 && (
                        <React.Fragment>
                              <div className={`${styleEffect.heightWrapperFilePreview}  flex-1`}>
                                    <div className='min-w-full min-h-full flex items-center flex-wrap gap-[10px]'>
                                          {filePreview.map((preview, index) => {
                                                return (
                                                      <div
                                                            className='relative w-[20%] flex justify-center items-center'
                                                            key={Math.random().toString()}
                                                            onClick={() => {
                                                                  setSelectImageModal(preview! as string)
                                                                  setModalFilePreview(true)
                                                            }}
                                                      >
                                                            <span
                                                                  className='absolute inline-block h-[25px] w-[25px] text-slate-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                                                  role='status'
                                                            ></span>
                                                            <img src={preview} alt='preview' className='w-full h-[72px]' />
                                                      </div>
                                                )
                                          })}
                                    </div>
                              </div>
                        </React.Fragment>
                  )}

                  {/* {@nút upload file} */}
                  {filePreview.length < 4 && (
                        <button
                              className={`${styleEffect.stateButton} xl:w-[32%] rounded-md min-h-[40px]`}
                              onClick={(e) => handleButtonClick(e)}
                        >
                              {filePreview.length > 0 ? 'Tải lên thêm' : 'Tải lên'}
                        </button>
                  )}

                  {/* {@Nút button reset, chỉ có khi khi upload ít nhất 1 file hình} */}
                  {filePreview.length > 0 && (
                        <div className='mt-[25px] h-[35px] w-[95px] flex gap-[16px] '>
                              <button
                                    disabled={filePreview.length < 0}
                                    onClick={(e) => {
                                          e.preventDefault()
                                          handleDeleteProductImages()
                                    }}
                                    className='min-w-[150px] px-[12px] py-[6px] bg-slate-700 text-white rounded-md '
                              >
                                    Chọn lại từ đầu
                              </button>
                              <div
                                    className=' bg-white h-[35px] min-w-[180px] flex items-center  gap-[8px] rounded-full'
                                    onClick={() => setModalFilePreview(true)}
                              >
                                    <View size={28} className=' ' />
                                    <p>Xem trước</p>
                              </div>
                        </div>
                  )}

                  {isSubmit && fileProduct.length === 0 && (
                        <span className={`${styleEffect.colorError} ${styleEffect.fontSizeError}`}>
                              Các hình ảnh chi tiết về sản phẩm là bắt buộc
                        </span>
                  )}

                  {/* {@model xem trước file} */}
                  {modalFilePreview && (
                        <BoxModal>
                              {selectImageModal && (
                                    <div
                                          className={` relative top-[50%] min-w-[600px] w-auto h-full flex flex-wrap mx-[50px] items-center gap-[16px] justify-center`}
                                    >
                                          <img
                                                key={selectImageModal}
                                                src={selectImageModal}
                                                alt='preview'
                                                className='w-[600px] h-[600px] bg-yellow-700'
                                          />
                                          <div
                                                className='absolute top-[-10px] right-[-16px] bg-slate-900 flex items-center justify-center rounded-md'
                                                onClick={() => {
                                                      setModalFilePreview(false)
                                                      setSelectImageModal('')
                                                }}
                                          >
                                                <X color='white' size={40} />
                                          </div>
                                    </div>
                              )}

                              {!selectImageModal && (
                                    <div
                                          className={` relative top-[50%] translate-y-[-50%] min-w-[600px] w-auto h-[300px] flex flex-wrap mx-[50px] items-center gap-[16px] justify-center`}
                                    >
                                          {filePreview.map((preview) => (
                                                <img
                                                      style={{ width: styleEffect.widthImageModal }}
                                                      key={Math.random().toString()}
                                                      src={preview}
                                                      alt='preview'
                                                      className=' h-full bg-yellow-700'
                                                />
                                          ))}

                                          <div
                                                className='absolute top-[-10px] right-[-16px] bg-slate-900 flex items-center justify-center rounded-md'
                                                onClick={() => {
                                                      setModalFilePreview(false)
                                                      setSelectImageModal('')
                                                }}
                                          >
                                                <X color='white' size={40} />
                                          </div>
                                    </div>
                              )}
                        </BoxModal>
                  )}
            </div>
      )
}

export default ButtonUploadMultipleWithId
