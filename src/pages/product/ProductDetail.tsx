import { BookOpenText, Hotel, NotepadText, Pen, Store } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { TProductDetail, TProductFull } from '../../types/product/product.type'
import { TImage } from './Product'
import BoxModalImage from './BoxModalImage'

type TProps = {
      product: TProductDetail
      isSuccess: boolean
}

const ProductDetail = (props: TProps) => {
      const { product, isSuccess } = props

      const image = useRef<HTMLImageElement | null>(null)
      const [imageActive, setImageActive] = useState<string>('')
      const [imageArray, setImageArray] = useState<TImage[]>([])
      const [openModal, setOpenModal] = useState<boolean>(false)

      console.log({ product })

      const handleMouseEnter = (secure_url: string) => {
            if (image.current) {
                  image.current.src = secure_url
                  image.current.style.transition = 'all 2s'
            }
      }

      const handleMouseLeave = () => {
            if (image.current) {
                  image.current.src = imageActive
            }
      }

      const handleClickImage = (secure_url: string) => {
            setImageActive(secure_url)
      }

      const handleOpenModal = () => {
            setOpenModal(true)
      }

      console.log({ product })

      useEffect(() => {
            if (isSuccess) {
                  setImageActive(product?.product_thumb_image.secure_url as string)
                  // product?.product_desc_image.unshift(product.product_thumb_image)
                  setImageArray(() => {
                        const array = product?.product_desc_image.map((img) => {
                              return { secure_url: img.secure_url }
                        })
                        array.unshift({ secure_url: product.product_thumb_image.secure_url })
                        return array
                  })
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isSuccess, product])

      console.log({ imageArray })

      const styleEffect = {
            isActive: 'border-[2px] border-blue-600',
      }

      return (
            <React.Fragment>
                  <div className='basis-[20%] md:basis-[35%] rounded-lg p-[14px]'>
                        <img
                              src={product!.product_thumb_image.secure_url}
                              className='cursor-pointer w-full h-full xl:h-[370px] p-[8px] max-w-full min-h-[200px] max-h-[200px] sm:min-h-[370px] sm:max-h-[380px] transition-all duration-700 rounded-[6px] border-[2px] border-slate-200'
                              alt='product'
                              ref={image}
                              onClick={handleOpenModal}
                        />
                  </div>
                  <div className='flex p-[14px] gap-[8px] flex-wrap md:flex-nowrap rounded-lg'>
                        {imageArray.map((image) => (
                              <img
                                    src={image.secure_url}
                                    className={`${
                                          imageActive === image.secure_url ? styleEffect.isActive : 'border-[2px] border-slate-200'
                                    } h-[100px] w-[40%] xl:w-[70px] xl:h-[70px] md:w-[60px] md:h-[80px]  rounded p-[8px]`}
                                    alt='product_sub'
                                    key={image.secure_url}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseEnter={() => handleMouseEnter(image.secure_url)}
                                    onClick={() => handleClickImage(image.secure_url as string)}
                              />
                        ))}
                  </div>
                  {/* <div className='flex-1 flex flex-col gap-[12px] mt-[8px] text-[14px] pb-[16px]'>
                        <h3>Đặc điểm nổi bật</h3>

                        <div className='px-[16px] flex gap-[8px] items-center'>
                              <div className='w-[32px] h-[32px] rounded-full bg-blue-700 flex items-center justify-center'>
                                    <Store color='white' size={20} />
                              </div>
                              <p>Shops: {product?.shop_id.shop_name}</p>
                        </div>
                        <div className='px-[16px] flex gap-[8px] items-center'>
                              <div className='w-[32px] h-[32px] rounded-full bg-blue-700 flex items-center justify-center'>
                                    <Pen color='white' size={20} />
                              </div>
                              <span>Tác giả: {product?.attribute.author}</span>
                        </div>

                        <div className='px-[16px] flex gap-[8px] items-center'>
                              <div className='w-[32px] h-[32px] rounded-full bg-blue-700 flex items-center justify-center'>
                                    <Hotel color='white' size={20} />
                              </div>
                              <span>Nhà xuất bản: {product?.attribute.publishing}</span>
                        </div>

                        <div className='px-[16px] flex gap-[8px] items-center'>
                              <div className='w-[32px] h-[32px] rounded-full bg-blue-700 flex items-center justify-center'>
                                    <BookOpenText color='white' size={20} />
                              </div>
                              <span>Số trang sách: {product?.attribute.page_number}</span>
                        </div>
                  </div> */}
                  {openModal && <BoxModalImage setOpenModal={setOpenModal} secure_url={imageArray} imageActive={imageActive} />}
            </React.Fragment>
      )
}

export default ProductDetail
