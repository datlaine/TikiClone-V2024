import { CaravanIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { TProductDetail } from '../../types/product/product.type'
import { Rate } from 'antd'
import ProductLabel from './ProductLabel'
import BoxConfirmAddress from '../../component/BoxUi/confirm/BoxConfirmAddress'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'
import { getAddressDefault, renderStringAddressDetailV2 } from '../../utils/address.util'
import { CartCurrent } from '../../Redux/cartSlice'

type TProps = { product: TProductDetail }

const ProductIntro = (props: TProps) => {
      const { product } = props

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
            <div className='flex flex-col gap-[16px] text-[13px]'>
                  <section className='bg-white w-full min-h-[160px] h-auto p-[12px] rounded-lg'>
                        <div className='flex flex-col gap-[16px]'>
                              <header>
                                    <div className='flex gap-[12px] flex-col xl:flex-row'>
                                          <ProductLabel content='Chính hãng' />
                                          <p>
                                                <span>Tác giả: </span>
                                                <span className='text-blue-700'>{product?.attribute.author}</span>
                                          </p>
                                    </div>
                              </header>
                              <p className='text-[18px] text-black font-semibold'>{product?.product_name}</p>
                              <div className=' h-[16px] flex gap-[4px]'>
                                    {/* {diffrenceBetweenStar(votes)?.map((opacity) => <Star opacity={opacity} />)} */}
                                    <Rate disabled allowHalf defaultValue={product.product_votes || 0} />
                              </div>
                              <p className='h-[16px] flex items-center gap-[8px]'>
                                    <span>Số sản phẩm có sẵn</span>
                                    <span>{product.product_available || 'NOT DATA'}</span>
                              </p>

                              <p className='h-[16px] flex items-center gap-[8px]'>
                                    <span>Số sản phẩm đã bán</span>
                                    <span>{product.product_is_bought || 'NOT DATA'}</span>
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
                              <div className=' min-h-[26px] h-max w-full flex justify-between'>
                                    <span>
                                          {cartCurrent.cart_current_address
                                                ? cartCurrent.cart_current_address
                                                : getAddressDefault(user?.user_address)
                                                ? `Giao đến: ${address_default ? renderStringAddressDetailV2(address_default[0]) : ''}`
                                                : 'Bạn chưa chọn ví trí giao hàng'}
                                    </span>
                                    <button className='text-blue-600' onClick={handleOpenModal}>
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

                  {openModal && <BoxConfirmAddress setOpenModal={setOpenModal} product_id={product._id} />}
            </div>
      )
}

export default ProductIntro
