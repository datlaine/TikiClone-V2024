import { CaravanIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { IProductBook, ProductAttributeObject, TProductDetail } from '../../types/product/product.type'
import { Rate } from 'antd'
import ProductLabel from './ProductLabel'
import BoxConfirmAddress from '../../component/BoxUi/confirm/BoxConfirmAddress'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'
import { getAddressDefault, renderStringAddressDetailV2 } from '../../utils/address.util'
import { CartCurrent } from '../../Redux/cartSlice'
import { IProductFood } from '../../types/product/product.food.type'
import ProductFood from './ProductFood'
import ProductBook from './ProductBook'

type TProps = { product: TProductDetail; totalComment: number; avg: number }

const ProductIntro = (props: TProps) => {
      const { product, totalComment, avg } = props

      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse
      const cartCurrent = useSelector((state: RootState) => state.cartSlice.cart_current) as CartCurrent
      const address_default = user?.user_address && user?.user_address.filter((address) => address.address_default === true)

      const [openModal, setOpenModal] = useState<boolean>(false)
      const [readMore, setReadMore] = useState<boolean>(false)
      const descriptionRef = useRef<HTMLParagraphElement>(null)

      const handleOpenModal = () => {
            setOpenModal(true)
      }

      useEffect(() => {
            if (product!.attribute.description.length > 10) {
                  setReadMore(true)
            }
      }, [product])

      // console.log({ cartCurrent: renderStringAddressDetailV2(address_default[0]) })

      const votes = 5

      return (
            <div className='flex flex-col min-h-full h-max gap-[16px] text-[13px]'>
                  <section className='bg-white w-full min-h-[160px] h-auto p-[12px] rounded-lg'>
                        <div className='flex flex-col gap-[16px]'>
                              <header>
                                    <div className='flex gap-[12px] flex-col xl:flex-row'>
                                          <ProductLabel content='Chính hãng' />
                                          {product.product_type === 'Book' && (
                                                <p>
                                                      <span>Tác giả: </span>
                                                      <span className='text-blue-700'>{(product?.attribute as IProductBook).author}</span>
                                                </p>
                                          )}
                                    </div>
                              </header>
                              <p className='text-[18px] text-black font-semibold'>{product?.product_name}</p>
                              <div className=' min-h-[16px] h-max flex flex-col xl:flex-row xl:items-center gap-[8px]'>
                                    <span className='font-semibold'>{avg.toFixed(1)}</span>
                                    {/* {diffrenceBetweenStar(votes)?.map((opacity) => <Star opacity={opacity} />)} */}
                                    <Rate disabled allowHalf defaultValue={product.product_votes || 0} className='text-[14px]' />
                                    <span className=''>({totalComment} lượt đánh giá)</span>
                              </div>
                              <p className='h-[16px] flex items-center gap-[8px]'>
                                    <span>Số sản phẩm có sẵn</span>
                                    <span>{product.product_available || 'NOT DATA'}</span>
                              </p>

                              <p className='h-[16px] flex items-center gap-[8px]'>
                                    <span>Số sản phẩm đã bán</span>
                                    <span>{product.product_is_bought}</span>
                              </p>
                              <p className='text-[24px] text-black font-bold'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                          product?.product_price as number,
                                    )}
                              </p>
                        </div>
                  </section>

                  <section className='bg-white w-full min-h-[160px] h-auto p-[12px] rounded-lg'>
                        <div className='flex flex-col gap-[8px]'>
                              <p className='[word-spacing:1px] text-[16px] text-black font-semibold word'>Thông tin vận chuyển</p>
                              <div className=' min-h-[26px] h-max w-full flex flex-col xl:flex-row justify-between'>
                                    <span>
                                          {cartCurrent.cart_current_address
                                                ? cartCurrent.cart_current_address
                                                : getAddressDefault(user?.user_address)
                                                ? `Giao đến: ${address_default ? renderStringAddressDetailV2(address_default[0]) : ''}`
                                                : 'Bạn chưa chọn ví trí giao hàng'}
                                    </span>
                                    <button className='text-left text-blue-600' onClick={handleOpenModal}>
                                          {getAddressDefault(user?.user_address) ? 'Đổi' : 'Chọn vị trí'}
                                    </button>
                              </div>
                              <div className='flex gap-[4px] text-[14px] items-center mt-[16px]'>
                                    <CaravanIcon color='gray' />
                                    <span>Giao vào thứ năm</span>
                              </div>
                              <p className='text-[14px]'>
                                    Trước 19h, 15/02: <span className='text-green-500'>Miễn phí</span>
                              </p>
                        </div>
                  </section>

                  <section className='min-h-[70px] h-max w-full  p-[12px] bg-[#ffffff] flex flex-col gap-[10px] flex-wrap '>
                        <p className='text-[18px] text-black font-semibold'>Thông tin sản phẩm</p>
                        <div className='flex flex-wrap'>
                              {product.product_type === 'Food' && <ProductFood product_attribute={product.attribute as IProductFood} />}
                              {product.product_type === 'Book' && <ProductBook product_attribute={product.attribute as IProductBook} />}
                        </div>
                  </section>

                  <section className='bg-white w-full min-h-[160px] h-max p-[12px]'>
                        <header>
                              <p className='text-[18px] text-black font-semibold'>Mô tả sản phẩm</p>
                        </header>
                        <p
                              className={`${readMore ? 'h-[200px]' : 'h-max'} overflow-y-hidden text-justify mt-[10px] leading-7`}
                              ref={descriptionRef}
                        >
                              {product?.attribute.description}
                        </p>

                        {product!.attribute.description.length > 200 && (
                              <div className='w-full flex justify-center'>
                                    <button onClick={() => setReadMore((prev) => !prev)}>{readMore ? 'Xem thêm' : 'Thu gọn'}</button>
                              </div>
                        )}
                  </section>

                  <section className='min-h-[70px] py-[30px] h-max w-full  p-[12px] bg-[#ffffff] flex items-center flex-col gap-[40px] flex-wrap '>
                        <img src={product.product_thumb_image.secure_url} className='w-[70%] h-[400px]' alt='' />
                        {product.product_desc_image.map((image) => (
                              <img key={image.public_id} src={image.secure_url} className='w-[70%] h-[400px]' alt='' />
                        ))}
                  </section>

                  {openModal && <BoxConfirmAddress setOpenModal={setOpenModal} product_id={product._id} />}
            </div>
      )
}

export default ProductIntro
